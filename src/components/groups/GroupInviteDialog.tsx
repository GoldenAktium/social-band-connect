
import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import type { Musician } from '@/types/musician';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import type { Group } from '@/types/group';
import { loadUserGroups, createGroup, inviteMusicianToGroup } from '@/services/groupService';

interface GroupInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  musician: Musician | null;
}

const GroupInviteDialog = ({ open, onOpenChange, musician }: GroupInviteDialogProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("create");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (open && user) {
      fetchUserGroups();
    }
  }, [open, user]);

  const fetchUserGroups = async () => {
    if (!user) return;
    
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
    }
  };

  const handleCreateGroup = async () => {
    if (!user || !musician) return;
    
    setIsLoading(true);
    try {
      // First, create the group
      const groupData = await createGroup(newGroupName, user.id);
      
      // Then, add the musician to the group
      await inviteMusicianToGroup(groupData.id, musician.id);
      
      toast({
        title: "Success",
        description: `Created group "${newGroupName}" and invited ${musician.name || 'this user'}`,
      });
      onOpenChange(false);
      setNewGroupName("");
    } catch (error) {
      console.error('Error creating group:', error);
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToGroup = async () => {
    if (!user || !musician || !selectedGroup) return;
    
    setIsLoading(true);
    try {
      await inviteMusicianToGroup(selectedGroup, musician.id);
      
      // Get the group name
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to Group</DialogTitle>
          <DialogDescription>
            Invite {musician?.name || 'this user'} to join a music group.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="create" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="create">Create Group</TabsTrigger>
            <TabsTrigger value="add" disabled={groups.length === 0}>Add to Existing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  placeholder="Enter group name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim() || isLoading}
              >
                {isLoading ? "Creating..." : "Create Group"}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="add">
            {groups.length > 0 ? (
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
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-4">
                    <p>You haven't created any groups yet.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInviteDialog;
