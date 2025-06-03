
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { getGroupDetails, getGroupMembers } from "@/services/groupService";
import { useAuth } from '@/context/AuthContext';
import Navbar from "@/components/Navbar";
import type { Group, GroupMember } from "@/types/group";
import { ArrowLeft } from "lucide-react";

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!id) return;
      
      try {
        const [groupData, membersData] = await Promise.all([
          getGroupDetails(id),
          getGroupMembers(id)
        ]);
        
        setGroup(groupData);
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching group data:", error);
        toast({
          title: "Error",
          description: "Failed to load group information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [id]);

  // Check if current user is the owner
  const isOwner = user && group && user.id === group.owner_id;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-6 px-4">
          <div className="text-center py-8">Loading group information...</div>
        </main>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-6 px-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Group not found or you don't have permission to view it.</p>
            <Button onClick={() => navigate("/groups")}>
              Back to Groups
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
          
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          <p className="text-muted-foreground">
            Created {new Date(group.created_at).toLocaleDateString()}
          </p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Group Members</CardTitle>
              <CardDescription>
                People who are invited to or joined this group
              </CardDescription>
            </CardHeader>
            <CardContent>
              {members.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No members in this group yet
                </p>
              ) : (
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.profiles?.avatar_url || undefined} />
                          <AvatarFallback>
                            {member.profiles?.name?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.profiles?.name || 'Unknown User'}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.profiles?.instrument || 'No instrument'}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={() => navigate("/find-musicians")}
          >
            Invite More Musicians
          </Button>
        </div>
      </main>
    </div>
  );
};

export default GroupDetail;
