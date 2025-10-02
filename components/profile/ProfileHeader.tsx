"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProfileHeaderProps {
  user?: {
    id: string;
    email?: string;
  } | null;
  profile?: {
    name?: string;
    username?: string;
    bio?: string;
    avatar_url?: string;
    created_at?: string;
  } | null;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ profile, isOwnProfile = true }: ProfileHeaderProps) {
  const router = useRouter();

  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "September 2025";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      year: "numeric" 
    });
  };

  return (
    <div className="bg-black">
      {/* Header with back button and profile info */}
      <div className="flex items-center px-4 py-3 border-b border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mr-4 p-2 hover:bg-gray-800 rounded-full"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-white">
            {profile?.name || "User"}
          </h1>
          <p className="text-sm text-gray-400">0 posts</p>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative">
        <div className="h-48 sm:h-64 bg-gray-800 bg-gradient-to-r from-gray-800 to-gray-700">
          {/* Cover image placeholder - you can add actual image here */}
        </div>
        
        {/* Avatar */}
        <div className="absolute -bottom-16 left-4">
          <div className="w-32 h-32 rounded-full border-4 border-black bg-gray-600 flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.name || "Profile"}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile / Follow Button */}
        <div className="absolute bottom-4 right-4">
          {isOwnProfile ? (
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-white/10"
            >
              Edit profile
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 text-black font-semibold">
              Follow
            </Button>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pt-20 pb-4">
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-white">
            {profile?.name || "User"}
          </h2>
          <p className="text-gray-400">
            @{profile?.username || "username"}
          </p>
        </div>

        {profile?.bio && (
          <p className="text-white mb-3">
            {profile.bio}
          </p>
        )}

        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Joined {formatJoinDate(profile?.created_at)}</span>
        </div>

        <div className="flex space-x-6 text-sm">
          <div>
            <span className="font-bold text-white">1</span>
            <span className="text-gray-400 ml-1">Following</span>
          </div>
          <div>
            <span className="font-bold text-white">0</span>
            <span className="text-gray-400 ml-1">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
