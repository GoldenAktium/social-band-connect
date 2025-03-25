
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from './ui-custom/Card';
import Button from './ui-custom/Button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AnimatedContainer } from './ui-custom/AnimatedContainer';

const MusicUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'audio/mpeg') {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an MP3 file',
          variant: 'destructive'
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !artist) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields and select a file',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to upload music',
          variant: 'destructive'
        });
        navigate('/login');
        return;
      }

      // Upload file to storage
      const fileName = `${user.id}_${Date.now()}_${file.name}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('music')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage.from('music').getPublicUrl(fileName);

      // Insert record in the database
      const { error: dbError } = await supabase
        .from('music_uploads')
        .insert([
          {
            user_id: user.id,
            title,
            artist,
            genre: genre || null,
            file_path: publicUrl
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      toast({
        title: 'Upload successful',
        description: 'Your music has been uploaded successfully',
      });

      // Reset form
      setFile(null);
      setTitle('');
      setArtist('');
      setGenre('');
      
      // Navigate to music page
      navigate('/find-music');
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your music. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatedContainer animation="scale-in">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-display">Upload Music</CardTitle>
          <CardDescription>Share your music with the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              placeholder="Enter the song title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artist">Artist/Band Name *</Label>
            <Input 
              id="artist" 
              placeholder="Enter the artist or band name" 
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Input 
              id="genre" 
              placeholder="Enter the music genre (optional)" 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="music-file">Music File (MP3) *</Label>
            <div className="flex items-center justify-center w-full">
              <label 
                htmlFor="music-file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 border-muted-foreground/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                    <>
                      <FileCheck className="w-8 h-8 mb-2 text-music-600" />
                      <p className="text-sm text-foreground font-medium truncate max-w-[200px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">MP3 files only</p>
                    </>
                  )}
                </div>
                <input 
                  id="music-file" 
                  type="file" 
                  accept="audio/mpeg" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="music" 
            className="w-full" 
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Music'}
          </Button>
        </CardFooter>
      </Card>
    </AnimatedContainer>
  );
};

export default MusicUpload;
