"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { Avatar } from "../profile/Avatar";
import { useAuth } from "@/hooks/useAuth";

interface UserDropdownProps {
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

export function UserDropdown({ user, profile }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center hover:bg-gray-900 rounded-full p-3 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`User menu for ${profile.name || 'User'}`}
      >
        <div className="flex-shrink-0">
          <Avatar
            src={profile.avatar_url}
            alt={profile.name || "Profile"}
            fallback={profile.name || "User"}
            size="md"
          />
        </div>
        <div className="ml-3 flex-1 min-w-0 hidden xl:block text-left">
          <p className="text-sm font-bold text-white truncate">
            {profile.name || "User"}
          </p>
          <p className="text-sm text-gray-400 truncate">
            @{profile.username || "username"}
          </p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute bottom-full right-0 mb-2 w-56 bg-black border border-gray-800 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] z-50 backdrop-blur-sm"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Arrow pointing down */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
          
          <div className="p-1">
            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-white hover:bg-gray-900 rounded-lg transition-colors text-left"
              role="menuitem"
              aria-label={`Log out ${profile.username || 'user'}`}
            >
              <LogOut className="h-4 w-4 mr-3 text-gray-400" aria-hidden="true" />
              <span className="text-sm font-medium">
                Log out @{profile.username || "user"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
