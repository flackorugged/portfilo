"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Profile", href: "/profile", icon: User },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 z-50">
      <div className="flex justify-around py-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
