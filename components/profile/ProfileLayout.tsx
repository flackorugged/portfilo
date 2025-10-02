"use client";

import { SideNavigation } from "./SideNavigation";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";
import { WhoToFollowSidebar } from "./WhoToFollowSidebar";
import { ProfileContent } from "./ProfileContent";
import { FloatingPostButton } from "./FloatingPostButton";
import { useState } from "react";

interface ProfileLayoutProps {
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
}

export function ProfileLayout({ user, profile }: ProfileLayoutProps) {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Container - Centered 3-column layout */}
      <div className="flex justify-center min-h-screen gap-x-6">
        {/* Left Navigation - Fixed width, always visible */}
        <div className="w-16 xl:w-64 flex-shrink-0">
          <SideNavigation user={user} profile={profile} />
        </div>
        
        {/* Center Content - Fixed width, centered */}
        <div className="w-full max-w-2xl flex-shrink-0 border-x border-gray-700">
          <ProfileHeader user={user} profile={profile} />
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <ProfileContent activeTab={activeTab} />
        </div>
        
        {/* Right Sidebar - Fixed width */}
        <div className="w-80 flex-shrink-0 hidden xl:block">
          <WhoToFollowSidebar />
        </div>
      </div>
      
      {/* Floating Post Button - only on mobile when nav is collapsed */}
      <div className="xl:hidden">
        <FloatingPostButton />
      </div>
    </div>
  );
}
