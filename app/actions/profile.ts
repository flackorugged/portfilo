'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { updateProfileSchema } from '@/lib/validations/profile';
import { type Profile } from '@/lib/types/profile';

export async function getCurrentUserProfile(): Promise<{ success: boolean; profile?: Profile & { followers: number; following: number }; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Get profile - it should exist from trigger
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      console.error('Profile not found for authenticated user:', {
        userId: user.id,
        email: user.email,
        error: profileError?.message,
        code: profileError?.code
      });
      return { success: false, error: 'Profile not found. Please contact support.' };
    }

    // Get stats
    const [followersResult, followingResult] = await Promise.all([
      supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', user.id),
      supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', user.id)
    ]);

    return {
      success: true,
      profile: {
        ...profile,
        followers: followersResult.count || 0,
        following: followingResult.count || 0
      }
    };
  } catch (error) {
    console.error('Get current user profile error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to get profile' 
    };
  }
}

export async function updateProfile(data: { name: string; bio?: string }) {
  try {
    // Validate input
    const validatedData = updateProfileSchema.parse(data);
    
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Update profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        name: validatedData.name,
        bio: validatedData.bio || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      throw new Error('Failed to update profile');
    }

    // Revalidate profile pages
    revalidatePath('/profile');

    return { success: true, profile };
  } catch (error) {
    console.error('Update profile error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update profile' 
    };
  }
}

export async function uploadProfilePicture(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Delete old profile picture if exists
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user.id)
      .single();

    if (currentProfile?.avatar_url) {
      const oldPath = currentProfile.avatar_url.split('/').slice(-2).join('/');
      await supabase.storage.from('profile-pictures').remove([oldPath]);
    }

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error('Failed to upload image');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(filePath);

    // Update profile with new URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      throw new Error('Failed to update profile');
    }

    // Revalidate profile pages
    revalidatePath('/profile');

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Upload profile picture error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to upload image' 
    };
  }
}

export async function uploadHeaderImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Delete old header image if exists
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('header_url')
      .eq('id', user.id)
      .single();

    if (currentProfile?.header_url) {
      const oldPath = currentProfile.header_url.split('/').slice(-2).join('/');
      await supabase.storage.from('header-images').remove([oldPath]);
    }

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from('header-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error('Failed to upload image');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('header-images')
      .getPublicUrl(filePath);

    // Update profile with new URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        header_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      throw new Error('Failed to update profile');
    }

    // Revalidate profile pages
    revalidatePath('/profile');

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Upload header image error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to upload image' 
    };
  }
}