import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'
import type { Database } from '@/types/supabase'

// Singleton instance to prevent creating multiple clients
let supabaseInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates or returns existing Supabase browser client
 * Uses singleton pattern to prevent memory leaks from multiple instances
 * Only runs in browser environment
 */
export function createClient() {
  // Ensure we're in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('createClient should only be called in browser environment');
  }

  if (!supabaseInstance) {
    // Get environment variables (will validate and cache)
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Validate environment variables are available
    if (!supabaseUrl || !supabaseKey) {
      const errorMsg = 'Supabase environment variables are not set. Please restart your dev server after setting up .env.local';
      console.error(errorMsg, {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
      });
      throw new Error(errorMsg);
    }

    // Validate URL format
    if (!supabaseUrl.startsWith('https://')) {
      const errorMsg = `Invalid Supabase URL: ${supabaseUrl}. Must start with https://`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      console.log('🔧 Initializing Supabase client...', {
        url: supabaseUrl,
        keyLength: supabaseKey.length,
      });

      supabaseInstance = createBrowserClient<Database>(
        supabaseUrl,
        supabaseKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            flowType: 'pkce',
          },
          global: {
            headers: {
              'X-Client-Info': 'portfilo-app',
            },
          },
        }
      );

      console.log('✅ Supabase client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to create Supabase client:', error);
      throw error;
    }
  }
  return supabaseInstance;
}