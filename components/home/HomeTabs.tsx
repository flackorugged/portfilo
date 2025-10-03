"use client";

import { cn } from "@/lib/utils";

interface HomeTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function HomeTabs({ activeTab, onTabChange }: HomeTabsProps) {
  const tabs = [
    { id: "recent", label: "Recent" },
    { id: "following", label: "Following" },
  ];

  return (
    <div className="border-b border-gray-700 bg-black">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 min-w-0 px-4 py-4 text-sm font-medium text-center border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab.id
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
