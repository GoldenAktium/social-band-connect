
import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { loadUserGroups, inviteMusicianToGroup } from '@/services/groupService';
import type { Group } from '@/types/group';
import type { Musician } from '@/types/musician';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GroupInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  musician: Musician | null;
}

const GroupInviteDialog = ({ open, onOpenChange, musician }: GroupInviteDialogProps) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGroups, setIsLoadingGroups] = useState<boolean>(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (open && user) {
      fetchUserGroups();
    }
  }, [open, user]);

  const fetchUserGroups = async () => {
    if (!user) return;
    
    setIsLoadingGroups(true);
    try {
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
    } finally {
      setIsLoadingGroups(false);
    }
  };

  const handleAddToGroup = async () => {
    if (!musician || !selectedGroup || !user) return;
    
    setIsLoading(true);
    try {
      await inviteMusicianToGroup(selectedGroup, musician.id);
      
      const selectedGroupData = groups.find(group => group.id === selectedGroup);
      
      toast({
        title: "Success",
        description: `Invited ${musician.name || 'this user'} to "${selectedGroupData?.name || 'the group'}"`,
      });
      onOpenChange(false);
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

  if (isLoadingGroups) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite to Group</DialogTitle>
            <DialogDescription>
              Loading your groups...
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-4">
                <p>Loading your groups...</p>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to Group</DialogTitle>
          <DialogDescription>
            Invite {musician?.name || 'this user'} to join one of your existing groups.
          </DialogDescription>
        </DialogHeader>
        
        {groups.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-4 space-y-4">
                <p>You haven't created any groups yet.</p>
                <Button onClick={() => navigate('/create-group')}>
                  Create Your First Group
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
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
                disabled={!selectedGroup || isLoading || !user}
              >
                {isLoading ? "Adding..." : "Add to Group"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroupInviteDialog;
