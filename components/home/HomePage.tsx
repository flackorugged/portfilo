"use client";

import { useState, lazy, Suspense } from "react";
import { HomeTabs } from "./HomeTabs";
import { Loading } from "@/components/ui/loading";

// Lazy load HomeContent for better performance
const HomeContent = lazy(() => import("./HomeContent").then(module => ({ default: module.HomeContent })));

export function HomePage() {
  const [activeTab, setActiveTab] = useState("recent");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <HomeTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Suspense fallback={
        <div className="p-8 text-center">
          <Loading className="mx-auto mb-4" />
          <p className="text-gray-400">Loading content...</p>
        </div>
      }>
        <HomeContent activeTab={activeTab} />
      </Suspense>
    </>
  );
}
