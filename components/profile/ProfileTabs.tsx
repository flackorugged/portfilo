"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "portfolio", label: "Portfolios" },
  { id: "posts", label: "Posts" },
];

interface ProfileTabsProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function ProfileTabs({ activeTab = "portfolio", onTabChange }: ProfileTabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="border-b border-gray-700 bg-black">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              "flex-1 min-w-0 px-4 py-4 text-sm font-medium text-center border-b-2 transition-colors whitespace-nowrap",
              currentTab === tab.id
                ? "text-white border-primary"
                : "text-gray-400 border-transparent hover:text-gray-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
