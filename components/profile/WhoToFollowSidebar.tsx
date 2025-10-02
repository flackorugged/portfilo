"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";

const topPortfolios = [
  {
    id: "1",
    name: "Alex Chen",
    username: "alexchen_trader",
    avatar: null,
    roi: "+127.5%",
    totalGain: "$45,230",
    followers: "2.1K",
  },
  {
    id: "2", 
    name: "Sarah Williams",
    username: "sarahw_crypto",
    avatar: null,
    roi: "+89.2%",
    totalGain: "$32,100",
    followers: "1.8K",
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    username: "mike_stonks",
    avatar: null,
    roi: "+156.8%",
    totalGain: "$67,890",
    followers: "3.4K",
  },
];

export function WhoToFollowSidebar() {
  return (
    <div className="h-screen sticky top-0 flex flex-col p-4">
      <div className="space-y-4 pt-4">
        {/* Search Bar */}
        <div className="rounded-full px-4 py-3 border border-gray-700 bg-gray-900/20 hover:bg-gray-900/40 transition-colors">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
          />
        </div>

        {/* Top Portfolios */}
        <div className="border border-gray-700 rounded-lg bg-transparent">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white text-xl font-bold">Top Portfolios</h3>
          </div>
          <div className="p-4 space-y-4">
            {topPortfolios.map((portfolio) => (
              <div key={portfolio.id} className="border border-gray-700 rounded-lg p-4 bg-transparent">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        {portfolio.avatar ? (
                          <Image
                            src={portfolio.avatar}
                            alt={portfolio.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <User className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {portfolio.name}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        @{portfolio.username}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                  <div>
                    <p className="text-gray-400">ROI</p>
                    <p className="text-green-400 font-medium">{portfolio.roi}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Gain</p>
                    <p className="text-white font-medium">{portfolio.totalGain}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Followers</p>
                    <p className="text-white font-medium">{portfolio.followers}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-black font-medium"
                >
                  View Portfolio
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
