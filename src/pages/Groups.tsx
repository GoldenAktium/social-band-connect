
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loadUserGroups, getGroupMembers } from "@/services/groupService";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import type { Group, GroupMember } from "@/types/group";
import { Users } from "lucide-react";

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;
      
      try {
        const userGroups = await loadUserGroups(user.id);
        setGroups(userGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
        toast({
          title: "Error",
          description: "Failed to load groups",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Groups</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button onClick={() => navigate("/create-group")}>
              Create Group
            </Button>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {loading ? (
          <div className="text-center py-8">Loading groups...</div>
        ) : groups.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't created any groups yet.</p>
            <Button onClick={() => navigate("/create-group")}>
              Create Your First Group
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> 
                    {group.name}
                  </CardTitle>
                  <CardDescription>
                    Created {new Date(group.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Group ID: {group.id}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate(`/group/${group.id}`)}
                  >
                    View Group
                  </Button>
                  <Button 
                    onClick={() => navigate(`/find-musicians`)}
                  >
                    Invite Members
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Groups;
