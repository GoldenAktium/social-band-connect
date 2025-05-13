
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { createGroup, inviteMusicianToGroup } from '@/services/groupService';
import type { Musician } from '@/types/musician';
import { useAuth } from '@/context/AuthContext';

interface CreateGroupTabProps {
  musician: Musician | null;
  onSuccess: () => void;
}

const CreateGroupTab = ({ musician, onSuccess }: CreateGroupTabProps) => {
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCreateGroup = async () => {
    if (!musician || !newGroupName.trim() || !user) {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a group",
          variant: "destructive"
        });
      }
      return;
    }
    
    setIsLoading(true);
    try {
      // Create the group with the authenticated user as owner
      const groupData = await createGroup(newGroupName, user.id);
      
      // Then, add the musician to the group
      await inviteMusicianToGroup(groupData.id, musician.id);
      
      toast({
        title: "Success",
        description: `Created group "${newGroupName}" and invited ${musician.name || 'this user'}`,
      });
      
      onSuccess();
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

  return (
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
      
      <DialogFooter className="mt-4">
        <Button
          onClick={handleCreateGroup}
          disabled={!newGroupName.trim() || isLoading || !user}
        >
          {isLoading ? "Creating..." : "Create Group"}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CreateGroupTab;
