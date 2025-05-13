
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { loadUserGroups, inviteMusicianToGroup } from '@/services/groupService';
import type { Group } from '@/types/group';
import type { Musician } from '@/types/musician';

interface ExistingGroupsTabProps {
  musician: Musician | null;
  onSuccess: () => void;
}

const ExistingGroupsTab = ({ musician, onSuccess }: ExistingGroupsTabProps) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    try {
      // Get the user from local storage
      const userString = localStorage.getItem('auth-user');
      if (!userString) return;
      
      const user = JSON.parse(userString);
      
      const userGroups = await loadUserGroups(user.id);
      setGroups(userGroups);
      
      // Select first group by default if any exist
      if (userGroups.length > 0) {
        setSelectedGroup(userGroups[0].id);
      }
    } catch (error) {
      console.error('Error loading groups:', error);
      toast({
        title: "Error",
        description: "Failed to load your groups",
        variant: "destructive"
      });
    }
  };

  const handleAddToGroup = async () => {
    if (!musician || !selectedGroup) return;
    
    setIsLoading(true);
    try {
      await inviteMusicianToGroup(selectedGroup, musician.id);
      
      // Get the group name
      const selectedGroupData = groups.find(group => group.id === selectedGroup);
      
      toast({
        title: "Success",
        description: `Invited ${musician.name || 'this user'} to "${selectedGroupData?.name || 'the group'}"`,
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding to group:', error);
      toast({
        title: "Error",
        description: "Failed to add user to group",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (groups.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-4">
            <p>You haven't created any groups yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label>Select Group</Label>
        <RadioGroup 
          value={selectedGroup || undefined} 
          onValueChange={setSelectedGroup}
        >
          {groups.map((group) => (
            <div key={group.id} className="flex items-center space-x-2">
              <RadioGroupItem value={group.id} id={`group-${group.id}`} />
              <Label htmlFor={`group-${group.id}`}>{group.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <DialogFooter className="mt-4">
        <Button
          onClick={handleAddToGroup}
          disabled={!selectedGroup || isLoading}
        >
          {isLoading ? "Adding..." : "Add to Group"}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ExistingGroupsTab;
