import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface UserData {
  id: string;
  email: string;
  name?: string;
  userType?: 'musician' | 'band-creator';
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => void;
  setUserType: (type: 'musician' | 'band-creator') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Try to retrieve user type from localStorage
          const savedUserType = localStorage.getItem(`userType_${session.user.id}`);
          
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
            userType: savedUserType as 'musician' | 'band-creator' | undefined
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Try to retrieve user type from localStorage
          const savedUserType = localStorage.getItem(`userType_${session.user.id}`);
          
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name,
            userType: savedUserType as 'musician' | 'band-creator' | undefined
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const setUserType = (type: 'musician' | 'band-creator') => {
    if (user) {
      // Save user type in localStorage
      localStorage.setItem(`userType_${user.id}`, type);
      
      // Update user state
      setUser({
        ...user,
        userType: type
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Special handling for unconfirmed email errors
        if (error.message.includes('Email not confirmed')) {
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email,
          });
          
          if (resendError) {
            throw resendError;
          }
          
          throw new Error('Please check your email for a confirmation link. We have resent the confirmation email.');
        }
        throw error;
      }

      if (data.user) {
        // Try to retrieve user type from localStorage
        const savedUserType = localStorage.getItem(`userType_${data.user.id}`);
        
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name,
          userType: savedUserType as 'musician' | 'band-creator' | undefined
        });
        
        toast({
          title: 'Welcome back!',
          description: `You've successfully signed in.`,
        });
        
        // If user has already selected a type, redirect to dashboard
        // Otherwise, redirect to user type selection
        if (savedUserType) {
          navigate('/dashboard');
        } else {
          navigate('/user-type');
        }
      }
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'An error occurred during sign in',
        variant: 'destructive',
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: window.location.origin + '/dashboard',
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Set the user immediately after signup
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name
        });
        
        toast({
          title: 'Account created',
          description: 'Your account has been successfully created.',
        });
        
        // Navigate directly to user type selection
        navigate('/user-type');
      }
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'An error occurred during sign up',
        variant: 'destructive',
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message || 'An error occurred during sign out',
        variant: 'destructive',
      });
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateUserData, setUserType }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
