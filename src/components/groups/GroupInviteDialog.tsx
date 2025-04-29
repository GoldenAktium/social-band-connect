
import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import type { Musician } from '@/types/musician';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateGroupTab from './CreateGroupTab';
import ExistingGroupsTab from './ExistingGroupsTab';

interface GroupInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  musician: Musician | null;
}

const GroupInviteDialog = ({ open, onOpenChange, musician }: GroupInviteDialogProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("create");
  const { user } = useAuth();

  // Handle success from either tab
  const handleSuccess = () => {
    onOpenChange(false);
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
            <TabsTrigger value="add">Add to Existing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <CreateGroupTab 
              musician={musician} 
              onSuccess={handleSuccess} 
            />
          </TabsContent>
          
          <TabsContent value="add">
            <ExistingGroupsTab 
              musician={musician} 
              onSuccess={handleSuccess} 
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInviteDialog;
