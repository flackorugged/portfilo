import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates all required environment variables at build/runtime
 */
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  NEXT_PUBLIC_SITE_URL: z.string().url('Invalid site URL').optional().default('http://localhost:3000'),
});

/**
 * Type for environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Lazy-loaded environment variables
 * Only validates when first accessed to ensure Next.js has injected the values
 */
let cachedEnv: Env | null = null;

function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  const isBrowser = typeof window !== 'undefined';
  
  try {
    const parsed = envSchema.parse({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });
    
    cachedEnv = parsed;
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n');
      const errorMessage = `❌ Invalid environment variables:\n${missingVars}\n\n${
        isBrowser 
          ? 'BROWSER: Make sure you restarted the dev server after adding environment variables.' 
          : 'SERVER: Please check your .env.local file.'
      }`;
      
      console.error(errorMessage);
      
      if (!isBrowser) {
        throw new Error(errorMessage);
      }
      
      // In browser, return a fallback to prevent crashes during development
      // This will still log the error but won't break the app
      return {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      };
    }
    throw error;
  }
}

/**
 * Validated and type-safe environment variables
 * Use env.VARIABLE_NAME instead of process.env.VARIABLE_NAME
 * This uses a Proxy to provide lazy validation
 */
export const env = new Proxy({} as Env, {
  get(target, prop: string) {
    const envVars = getEnv();
    return envVars[prop as keyof Env];
  },
});

