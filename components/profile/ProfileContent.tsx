import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { ProfileTabs } from './ProfileTabs';
import { ProfileError } from './ProfileError';
import { ProfileSection } from './ProfileSection';

interface ProfileContentProps {
  userId: string;
}

export default async function ProfileContent({ userId }: ProfileContentProps) {
  try {
    const supabase = await createClient();
    
    // Get profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return <ProfileError error={profileError} userId={userId} />;
    }

    if (!profile) {
      console.error('Profile not found for user:', userId);
      return <ProfileError error={{ message: 'Profile not found' }} userId={userId} />;
    }

    console.log('Profile loaded successfully:', profile.name);

    // For now, use default values for followers/following
    // TODO: Implement follows functionality later
    const followers = 0;
    const following = 0;

    return (
      <div className="min-h-screen bg-black">
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">{profile.name || "User"}</h1>
                <p className="text-sm text-gray-400">0 posts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Header - Contains header image and edit button positioning */}
        <div className="relative">
          {/* Header Image */}
          <div className="h-48 md:h-64 bg-gray-700 relative overflow-hidden">
            {profile.header_url ? (
              <Image
                src={profile.header_url}
                alt="Header"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            ) : (
              <div className="w-full h-full bg-gray-700" />
            )}
          </div>

          {/* Profile Section - Avatar, Name, Username, and Edit Button */}
          <ProfileSection profile={profile} />
        </div>

        {/* Profile Info - Bio, Joined Date, and Stats */}
        <div className="px-4 md:px-6 pb-4">
          <div className="space-y-3">
            {/* Bio */}
            {profile.bio && (
              <p className="text-white text-base leading-relaxed">{profile.bio}</p>
            )}

            {/* Joined Date */}
            <div className="text-gray-400 text-sm">
              <p>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}</p>
            </div>

            {/* Following/Followers */}
            <div className="flex space-x-5 text-sm">
              <button className="hover:underline">
                <span className="text-white font-semibold">
                  {following}
                </span>
                <span className="text-gray-400 ml-1">Following</span>
              </button>
              <button className="hover:underline">
                <span className="text-white font-semibold">
                  {followers}
                </span>
                <span className="text-gray-400 ml-1">Followers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <ProfileTabs activeTab="portfolio" />
      </div>
    );
  } catch {
    return <ProfileError error={{ message: 'Failed to load profile' }} userId={userId} />;
  }
}