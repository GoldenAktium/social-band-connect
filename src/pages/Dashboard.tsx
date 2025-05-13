
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Users, Music, UserSearch, Upload, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'Musician'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Find Musicians Card */}
        <Card className="transition-all ease-in-out duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserSearch className="text-music-500" />
              Find Musicians
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Discover talented musicians in your area looking to collaborate.</p>
            <Link to="/find-musicians">
              <Button>Browse Musicians</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Find Bands Card */}
        <Card className="transition-all ease-in-out duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-music-500" />
              Find Bands
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Explore bands that are looking for new members to join them.</p>
            <Link to="/find-bands">
              <Button>Browse Bands</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Find Music Card */}
        <Card className="transition-all ease-in-out duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="text-music-500" />
              Explore Music
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Listen to tracks uploaded by musicians and bands on the platform.</p>
            <Link to="/find-music">
              <Button>Listen Now</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Upload Music Card */}
        <Card className="transition-all ease-in-out duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="text-music-500" />
              Upload Music
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Share your original tracks, demos, or performances with the community.</p>
            <Link to="/upload-music">
              <Button>Upload Music</Button>
            </Link>
          </CardContent>
        </Card>
        
        {/* Groups Card */}
        <Card className="transition-all ease-in-out duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="text-music-500" />
              My Groups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage your groups and chat with fellow musicians.</p>
            <Link to="/groups">
              <Button>View Groups</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
