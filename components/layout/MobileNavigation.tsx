"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const mobileNavItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Profile", href: "/profile", icon: User },
];

export function MobileNavigation() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 z-50" role="navigation" aria-label="Mobile navigation">
      <div className="flex justify-around py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-center py-3 px-4 rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-400 hover:text-white"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.name}
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          );
        })}
        
        {/* Sign Out Button */}
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center py-3 px-4 rounded-lg transition-colors text-gray-400 hover:text-white"
          aria-label="Sign out"
        >
          <LogOut className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
