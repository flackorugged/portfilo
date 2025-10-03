"use client";

import { ReactNode } from "react";
import { SideNavigation } from "./SideNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { FloatingPostButton } from "./FloatingPostButton";
import { RightSidebar } from "./RightSidebar";

interface AppLayoutProps {
  children: ReactNode;
  user?: {
    id: string;
    email?: string;
  } | null;
  profile?: {
    id: string;
    username: string;
    name: string;
    bio?: string | null;
    location?: string | null;
    avatar_url?: string | null;
    header_url?: string | null;
    created_at: string;
    updated_at: string;
  } | null;
  showRightSidebar?: boolean;
}

export function AppLayout({ 
  children, 
  user, 
  profile, 
  showRightSidebar = true 
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Container - Centered 3-column layout */}
      <div className="flex justify-center min-h-screen gap-x-6">
        {/* Left Navigation - Hidden on mobile, visible on desktop */}
        <div className="w-16 xl:w-64 flex-shrink-0 hidden lg:block">
          <SideNavigation user={user} profile={profile} />
        </div>
        
        {/* Center Content - Full width on mobile, fixed width on desktop */}
        <div className="w-full lg:max-w-2xl flex-shrink-0 border-x border-gray-700 min-h-screen pb-20 lg:pb-0">
          {children}
        </div>
        
        {/* Right Sidebar - Hidden on mobile, visible on desktop */}
        {showRightSidebar && (
          <div className="w-80 flex-shrink-0 hidden xl:block">
            <RightSidebar />
          </div>
        )}
      </div>
      
      {/* Floating Post Button - only on mobile when nav is collapsed */}
      <div className="lg:hidden">
        <FloatingPostButton />
      </div>
      
      {/* Mobile Navigation - Bottom navigation for mobile */}
      <MobileNavigation />
    </div>
  );
}
