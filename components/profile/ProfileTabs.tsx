"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "portfolio", label: "Portfolios" },
  { id: "posts", label: "Posts" },
];

interface ProfileTabsProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  portfolios?: any[];
  posts?: any[];
}

export function ProfileTabs({ 
  activeTab = "portfolio", 
  onTabChange,
  portfolios = [],
  posts = []
}: ProfileTabsProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  const handleCreatePortfolio = () => {
    // TODO: Implement create portfolio functionality
    console.log("Create portfolio clicked");
  };

  const handleCreatePost = () => {
    // TODO: Implement create post functionality
    console.log("Create post clicked");
  };

  const renderTabContent = () => {
    if (currentTab === "portfolio") {
      if (portfolios.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <p className="text-gray-400 text-center mb-6 text-base">
              When you create a portfolio, it will appear here
            </p>
            <Button
              onClick={handleCreatePortfolio}
              className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2 rounded-full"
            >
              Create Portfolio
            </Button>
          </div>
        );
      }
      // TODO: Render portfolios when available
      return (
        <div className="p-4">
          {/* Portfolio items will be rendered here */}
        </div>
      );
    }

    if (currentTab === "posts") {
      if (posts.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <p className="text-gray-400 text-center mb-6 text-base">
              When you create a post, it will appear here
            </p>
            <Button
              onClick={handleCreatePost}
              className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2 rounded-full"
            >
              Create Post
            </Button>
          </div>
        );
      }
      // TODO: Render posts when available
      return (
        <div className="p-4">
          {/* Post items will be rendered here */}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-black">
      <div className="border-b border-gray-700">
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
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
