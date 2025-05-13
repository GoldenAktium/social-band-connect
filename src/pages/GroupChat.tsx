
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { User, Send, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getGroupDetails,
  getGroupMembers,
  getGroupMessages,
  sendGroupMessage,
  subscribeToGroupMessages
} from '@/services/groupService';
import type { Group, GroupMember, GroupMessage } from '@/types/group';
import type { Musician } from '@/types/musician';

const GroupChat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    if (!id || !user) return;
    
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load group details
        const groupData = await getGroupDetails(id);
        setGroup(groupData);
        
        // Load group members
        const membersData = await getGroupMembers(id);
        setMembers(membersData);
        
        // Load messages
        const messagesData = await getGroupMessages(id);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error loading group data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load group data',
          variant: 'destructive'
        });
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
    // Subscribe to new messages
    const subscription = subscribeToGroupMessages(id, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    
    return () => {
      // Clean up subscription when component unmounts
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [id, user, navigate, toast]);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user || !id) return;
    
    try {
      setSendingMessage(true);
      await sendGroupMessage(id, user.id, newMessage);
      setNewMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setSendingMessage(false);
    }
  };
  
  const getMessageSenderName = (message: GroupMessage) => {
    // @ts-ignore - We know profiles will be available through the join
    const profile = message.profiles as Musician;
    return profile?.name || 'Unknown User';
  };
  
  const isCurrentUserMessage = (message: GroupMessage) => {
    return message.user_id === user?.id;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading group chat...</p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-4">
              <p>Group not found or you don't have access to it.</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard')}>
                Go back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Group Info & Members */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>
                {members.length} member{members.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-1">
                  <User className="h-4 w-4" /> Members
                </h3>
                <div className="space-y-2">
                  {members.map((member) => (
                    // @ts-ignore - We know profiles will be available through the join
                    <div key={member.id} className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                        {/* @ts-ignore - We know profiles will be available through the join */}
                        {member.profiles?.name?.[0] || 'U'}
                      </div>
                      {/* @ts-ignore - We know profiles will be available through the join */}
                      <div>{member.profiles?.name || 'Unknown user'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="flex flex-col h-[70vh]">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              {/* Messages Area */}
              <div className="flex-grow overflow-y-auto mb-4">
                <div className="space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${isCurrentUserMessage(message) ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`rounded-lg py-2 px-4 max-w-[80%] ${
                            isCurrentUserMessage(message) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          {!isCurrentUserMessage(message) && (
                            <p className="text-xs font-semibold mb-1">
                              {getMessageSenderName(message)}
                            </p>
                          )}
                          <p className="whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                          <p className="text-xs opacity-70 text-right mt-1">
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <Separator className="my-2" />
              
              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  disabled={sendingMessage}
                />
                <Button type="submit" disabled={!newMessage.trim() || sendingMessage}>
                  {sendingMessage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
