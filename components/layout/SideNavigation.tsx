"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User, 
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserDropdown } from "./UserDropdown";

interface SideNavigationProps {
  user?: {
    id: string;
    email?: string;
  } | null;
  profile?: {
    name?: string;
    username?: string;
    avatar_url?: string | null;
  } | null;
}

const navigationItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Profile", href: "/profile", icon: User },
  { name: "More", href: "/more", icon: MoreHorizontal },
];

export function SideNavigation({ user, profile }: SideNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="h-screen sticky top-0 flex flex-col bg-black overflow-hidden">
      <div className="flex flex-col flex-grow pt-3 pb-4 overflow-y-auto overflow-x-hidden">
        <div className="flex items-center flex-shrink-0 px-4 py-3 h-16 mb-4">
          <Image
            src="/portfilogo.svg"
            alt="PortFilo Logo"
            width={40}
            height={40}
            className="w-15 h-15"
            priority
          />
        </div>
        
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-2" role="navigation" aria-label="Main navigation">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-3 text-xl font-normal rounded-full transition-colors hover:bg-gray-900",
                    isActive
                      ? "text-white font-bold"
                      : "text-gray-400 hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.name}
                >
                  <item.icon
                    className={cn(
                      "mr-5 flex-shrink-0 h-7 w-7",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    )}
                    aria-hidden="true"
                  />
                  <span className="hidden xl:block">{item.name}</span>
                </Link>
              );
            })}
            
            {/* Post Button */}
            <div className="pt-6 px-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg py-3 rounded-full"
                aria-label="Create new post"
              >
                <span className="hidden xl:block">Post</span>
                <span className="xl:hidden">Post</span>
              </Button>
            </div>

          </nav>
          
          {/* User Dropdown */}
          {user && (
            <div className="px-4 py-4 mt-auto">
              <UserDropdown user={user} profile={profile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
