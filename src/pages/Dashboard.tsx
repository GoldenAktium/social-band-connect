
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  User, 
  Search, 
  Music, 
  Settings, 
  Bell, 
  MessageSquare,
  MapPin,
  Calendar,
  Guitar,
  Mic,
  Star
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { AnimatedContainer } from '@/components/ui-custom/AnimatedContainer';
import { cn } from '@/lib/utils';

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const recommendedMusicians = [
    {
      id: 1,
      name: 'Sarah Johnson',
      instrument: 'Vocalist',
      location: 'New York, NY',
      skillLevel: 'Advanced',
      rating: 4.8,
      image: '/placeholder.svg',
      genres: ['Jazz', 'Soul', 'R&B'],
    },
    {
      id: 2,
      name: 'Alex Chen',
      instrument: 'Guitarist',
      location: 'Los Angeles, CA',
      skillLevel: 'Intermediate',
      rating: 4.5,
      image: '/placeholder.svg',
      genres: ['Rock', 'Alternative', 'Blues'],
    },
    {
      id: 3,
      name: 'Mark Davis',
      instrument: 'Drummer',
      location: 'Chicago, IL',
      skillLevel: 'Professional',
      rating: 4.9,
      image: '/placeholder.svg',
      genres: ['Metal', 'Rock', 'Punk'],
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Virtual Jam Session',
      date: 'Sep 15, 2023',
      participants: 8,
    },
    {
      id: 2,
      title: 'Local Band Meetup',
      date: 'Sep 22, 2023',
      participants: 12,
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'message',
      content: 'New message from Alex Chen',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'connection',
      content: 'Sarah Johnson accepted your connection request',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'event',
      content: 'Upcoming event: Virtual Jam Session',
      time: '2 days ago',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 border-r border-border bg-background/80 backdrop-blur-sm z-30 hidden lg:block">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link to="/" className="flex items-center space-x-2 text-xl font-display font-bold">
            <Music className="h-6 w-6 text-music-600" />
            <span>SocialBand</span>
          </Link>
        </div>
        
        <div className="p-6 space-y-1">
          <button 
            onClick={() => setSelectedTab('dashboard')}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-md transition-colors",
              selectedTab === 'dashboard' 
                ? "bg-music-100 text-music-700" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setSelectedTab('find')}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-md transition-colors",
              selectedTab === 'find' 
                ? "bg-music-100 text-music-700" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Search className="h-5 w-5 mr-3" />
            Find Musicians
          </button>
          
          <button 
            onClick={() => setSelectedTab('bands')}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-md transition-colors",
              selectedTab === 'bands' 
                ? "bg-music-100 text-music-700" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Users className="h-5 w-5 mr-3" />
            My Bands
          </button>
          
          <button 
            onClick={() => setSelectedTab('messages')}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-md transition-colors",
              selectedTab === 'messages' 
                ? "bg-music-100 text-music-700" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            Messages
          </button>
          
          <button 
            onClick={() => setSelectedTab('settings')}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-md transition-colors",
              selectedTab === 'settings' 
                ? "bg-music-100 text-music-700" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
        </div>
      </div>
      
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between border-b border-border p-4 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
        <Link to="/" className="flex items-center space-x-2 text-xl font-display font-bold">
          <Music className="h-6 w-6 text-music-600" />
          <span>SocialBand</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button className="text-foreground">
            <Bell className="h-5 w-5" />
          </button>
          <button className="text-foreground">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-sm p-2 flex justify-around lg:hidden z-30">
        <button 
          onClick={() => setSelectedTab('dashboard')}
          className={cn(
            "flex flex-col items-center p-2 rounded-md transition-colors",
            selectedTab === 'dashboard' 
              ? "text-music-600" 
              : "text-muted-foreground"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        
        <button 
          onClick={() => setSelectedTab('find')}
          className={cn(
            "flex flex-col items-center p-2 rounded-md transition-colors",
            selectedTab === 'find' 
              ? "text-music-600" 
              : "text-muted-foreground"
          )}
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Find</span>
        </button>
        
        <button 
          onClick={() => setSelectedTab('bands')}
          className={cn(
            "flex flex-col items-center p-2 rounded-md transition-colors",
            selectedTab === 'bands' 
              ? "text-music-600" 
              : "text-muted-foreground"
          )}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Bands</span>
        </button>
        
        <button 
          onClick={() => setSelectedTab('messages')}
          className={cn(
            "flex flex-col items-center p-2 rounded-md transition-colors",
            selectedTab === 'messages' 
              ? "text-music-600" 
              : "text-muted-foreground"
          )}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Messages</span>
        </button>
        
        <button 
          onClick={() => setSelectedTab('settings')}
          className={cn(
            "flex flex-col items-center p-2 rounded-md transition-colors",
            selectedTab === 'settings' 
              ? "text-music-600" 
              : "text-muted-foreground"
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64 pb-20 lg:pb-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John</p>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="space-y-6">
            {/* Profile completion card */}
            <AnimatedContainer animation="slide-up">
              <Card variant="glass" className="bg-gradient-to-r from-music-100/70 to-music-200/50 border-music-300/20">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-semibold">Complete your profile</h3>
                    <p className="text-muted-foreground">
                      Add more details to your profile to increase your chances of finding the perfect match.
                    </p>
                    <div className="h-2 w-full bg-white/40 rounded-full">
                      <div className="h-2 w-3/5 bg-music-600 rounded-full"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">60% Complete</span> - Add your influences, upload a video, and set availability
                    </p>
                  </div>
                  <Button variant="music" className="shrink-0">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>
            </AnimatedContainer>
            
            {/* Stats and musician recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedContainer animation="slide-up" delay="0.1s">
                <Card className="md:col-span-1 h-full">
                  <CardHeader>
                    <CardTitle>Your Stats</CardTitle>
                    <CardDescription>Profile activity and reach</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-music-100 rounded-full text-music-600">
                          <User className="h-4 w-4" />
                        </div>
                        <span>Profile Views</span>
                      </div>
                      <span className="font-semibold">32</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-music-100 rounded-full text-music-600">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <span>New Messages</span>
                      </div>
                      <span className="font-semibold">5</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-music-100 rounded-full text-music-600">
                          <Users className="h-4 w-4" />
                        </div>
                        <span>Connection Requests</span>
                      </div>
                      <span className="font-semibold">8</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
              
              <AnimatedContainer animation="slide-up" delay="0.2s" className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recommended Musicians</CardTitle>
                      <CardDescription>Based on your preferences and location</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedMusicians.map((musician) => (
                        <div key={musician.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                            <img 
                              src={musician.image} 
                              alt={musician.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium truncate">{musician.name}</h4>
                              <div className="flex items-center text-sm">
                                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                                <span>{musician.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="truncate">
                                {musician.instrument} • {musician.skillLevel}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">{musician.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {musician.genres.map((genre, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-0.5 text-xs bg-music-100 text-music-700 rounded-full"
                                >
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="flex-shrink-0">
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </div>
            
            {/* Events and notifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedContainer animation="slide-up" delay="0.3s">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Connect with musicians in person</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {upcomingEvents.length === 0 ? (
                      <div className="text-center py-6">
                        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No upcoming events</p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Browse Events
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span>{event.participants} people attending</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                RSVP
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          View All Events
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedContainer>
              
              <AnimatedContainer animation="slide-up" delay="0.4s">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>Stay updated with your network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {notifications.length === 0 ? (
                      <div className="text-center py-6">
                        <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No new notifications</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className={cn(
                              "p-2 rounded-full",
                              notification.type === 'message' ? "bg-brand-100 text-brand-600" :
                              notification.type === 'connection' ? "bg-music-100 text-music-600" :
                              "bg-muted text-muted-foreground"
                            )}>
                              {notification.type === 'message' ? (
                                <MessageSquare className="h-4 w-4" />
                              ) : notification.type === 'connection' ? (
                                <Users className="h-4 w-4" />
                              ) : (
                                <Calendar className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{notification.content}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          View All Notifications
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
