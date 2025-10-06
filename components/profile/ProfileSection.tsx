"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { type Profile } from "@/lib/types/profile";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileSectionProps {
  profile: Profile;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(profile);
  const router = useRouter();

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setCurrentProfile(updatedProfile);
    // Refresh server components to get the latest data
    // This is more efficient than window.location.reload()
    router.refresh();
  };
  return (
    <>
      {/* Edit Profile Button - Positioned absolutely below header, right side */}
      <div className="absolute top-[216px] md:top-[284px] right-4 md:right-6 z-20">
        <button 
          onClick={handleEditClick}
          className="bg-transparent border border-gray-600 text-white hover:bg-gray-800/50 px-4 sm:px-6 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          Edit Profile
        </button>
      </div>

      {/* Avatar, Name, Username - Below Header */}
      <div className="relative z-10 px-4 md:px-6">
        {/* Avatar - Overlaps Header (centered vertically with header bottom edge) */}
        <div className="-mt-12 sm:-mt-16 mb-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-600 flex items-center justify-center border-4 border-black">
            {currentProfile.avatar_url ? (
              <Image
                src={currentProfile.avatar_url}
                alt={`${currentProfile.name || "User"}'s profile picture`}
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-2xl sm:text-3xl font-medium">
                {(currentProfile.name || "U").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Name and Username - Below Avatar */}
        <div className="mb-3">
          <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">
            {currentProfile.name || "User"}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-0.5">
            @{currentProfile.username || "username"}
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={currentProfile}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
}
