
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { createGroup } from '@/services/groupService';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !user) {
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
      const groupData = await createGroup(groupName, user.id);
      
      toast({
        title: "Success",
        description: `Created group "${groupName}" successfully!`,
      });
      
      // Navigate to the new group
      navigate(`/group/${groupData.id}`);
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/groups")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Groups
          </Button>
          
          <h1 className="text-3xl font-bold tracking-tight">Create New Group</h1>
          <p className="text-muted-foreground">
            Create a new music group and start collaborating with other musicians.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Group Details</CardTitle>
              <CardDescription>
                Enter the name for your new group
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              
              <Button
                onClick={handleCreateGroup}
                disabled={!groupName.trim() || isLoading || !user}
                className="w-full"
              >
                {isLoading ? "Creating..." : "Create Group"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateGroup;
