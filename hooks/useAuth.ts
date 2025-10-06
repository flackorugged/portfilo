import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

/**
 * Custom hook for authentication
 * Provides current user, loading state, and sign out function
 * 
 * Note: Supabase client is now a singleton, so safe to call createClient multiple times
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    let mounted = true;

    const initAuth = async () => {
      try {
        // Get singleton Supabase client
        const supabase = createClient();

        // Get current user with error handling
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error fetching user:', userError);
          setError(userError.message);
        }
        
        if (mounted) {
          setUser(user);
          setLoading(false);
        }

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (mounted) {
              setUser(session?.user ?? null);
              setLoading(false);
              setError(null);
            }
          }
        );

        return subscription;
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize authentication');
          setLoading(false);
        }
        return null;
      }
    };

    let subscription: { unsubscribe: () => void } | null = null;
    
    initAuth().then((sub) => {
      subscription = sub;
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []); // Empty dependency array since supabase is now a stable singleton

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/');
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  return {
    user,
    loading,
    error,
    signOut,
  };
}
