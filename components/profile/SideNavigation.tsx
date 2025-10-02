"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User, 
  MoreHorizontal,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SideNavigationProps {
  user?: {
    id: string;
    email?: string;
  } | null;
  profile?: {
    name?: string;
    username?: string;
    avatar_url?: string;
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
    <div className="h-screen sticky top-0 flex flex-col bg-black">
      <div className="flex flex-col flex-grow pt-3 pb-4 overflow-y-auto">
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
          <nav className="flex-1 px-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-3 text-xl font-normal rounded-full transition-colors hover:bg-gray-900",
                    isActive
                      ? "text-white"
                      : "text-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-5 flex-shrink-0 h-7 w-7",
                      isActive ? "text-white" : "text-white"
                    )}
                  />
                  <span className="hidden xl:block">{item.name}</span>
                </Link>
              );
            })}
            
            {/* Post Button */}
            <div className="pt-6 px-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg py-3 rounded-full">
                <Plus className="h-5 w-5 xl:mr-2" />
                <span className="hidden xl:block">Post</span>
              </Button>
            </div>
          </nav>
          
          {user && (
            <div className="px-4 py-4 mt-auto">
              <div className="flex items-center hover:bg-gray-900 rounded-full p-3 cursor-pointer transition-colors">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={profile.avatar_url}
                        alt={profile.name || "Profile"}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0 hidden xl:block">
                  <p className="text-sm font-bold text-white truncate">
                    {profile?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    @{profile?.username || "username"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
