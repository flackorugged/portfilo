import { type Profile } from '@/lib/types/profile';

interface ProfileInfoProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="px-4 md:px-6 pb-4">
      <div className="space-y-4">
        {/* Bio */}
        {profile.bio && (
          <p className="text-white text-base leading-relaxed">{profile.bio}</p>
        )}

        {/* Joined Date */}
        <div className="flex flex-col space-y-1 text-gray-400 text-sm">
          <p>Joined {formatDate(profile.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
