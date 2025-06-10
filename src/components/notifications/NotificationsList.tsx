
import { useState, useEffect } from 'react';
import { Bell, Users, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  deleteNotification,
  type Notification 
} from '@/services/notificationService';
import { acceptGroupInvite, declineGroupInvite } from '@/services/groupService';

const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      const data = await getUserNotifications(user.id);
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvite = async (notification: Notification) => {
    try {
      await acceptGroupInvite(notification.data.group_id, user!.id);
      await deleteNotification(notification.id);
      
      toast({
        title: "Success",
        description: `You've joined "${notification.data.group_name}"!`
      });
      
      // Remove notification from state
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    } catch (error) {
      console.error('Error accepting invite:', error);
      toast({
        title: "Error",
        description: "Failed to accept invite",
        variant: "destructive"
      });
    }
  };

  const handleDeclineInvite = async (notification: Notification) => {
    try {
      await declineGroupInvite(notification.data.group_id, user!.id);
      await deleteNotification(notification.id);
      
      toast({
        title: "Invite declined",
        description: `You've declined the invite to "${notification.data.group_name}"`
      });
      
      // Remove notification from state
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    } catch (error) {
      console.error('Error declining invite:', error);
      toast({
        title: "Error",
        description: "Failed to decline invite",
        variant: "destructive"
      });
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-4 text-muted-foreground">
              No notifications
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={!notification.read ? 'border-primary/50' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {notification.type === 'group_invite' && <Users className="h-4 w-4" />}
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    {!notification.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </span>
                </div>
                <CardDescription>{notification.message}</CardDescription>
              </CardHeader>
              
              {notification.type === 'group_invite' && (
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptInvite(notification)}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeclineInvite(notification)}
                      className="flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              )}
              
              {!notification.read && notification.type !== 'group_invite' && (
                <CardContent className="pt-0">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
