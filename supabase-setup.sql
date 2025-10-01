-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Remove the updated_at trigger since we don't have that column

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_username TEXT;
  user_name TEXT;
BEGIN
  -- Only create profile for confirmed users
  IF NEW.email_confirmed_at IS NOT NULL THEN
    -- Extract username and name from metadata
    user_username := NEW.raw_user_meta_data->>'username';
    user_name := NEW.raw_user_meta_data->>'name';
    
    -- Log the metadata for debugging
    RAISE NOTICE 'Creating profile for user % with metadata: %', NEW.id, NEW.raw_user_meta_data;
    RAISE NOTICE 'Username: %, Name: %', user_username, user_name;
    
    -- Only create profile if we have valid data
    IF user_username IS NOT NULL AND user_name IS NOT NULL THEN
      INSERT INTO public.profiles (id, username, name)
      VALUES (NEW.id, user_username, user_name)
      ON CONFLICT (id) DO UPDATE SET
        username = EXCLUDED.username,
        name = EXCLUDED.name;
      
      RAISE NOTICE 'Profile created successfully for user %', NEW.id;
    ELSE
      RAISE WARNING 'Missing username or name in metadata for user %', NEW.id;
    END IF;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error and continue (don't fail user creation)
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
