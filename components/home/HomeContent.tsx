"use client";

interface HomeContentProps {
  activeTab: string;
}

export function HomeContent({ activeTab }: HomeContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "recent":
        return (
          <div className="p-8 text-center">
            <div className="max-w-sm mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                No recent posts
              </h3>
              <p className="text-gray-400 mb-6">
                Recent posts from the community will appear here.
              </p>
            </div>
          </div>
        );
      
      case "following":
        return (
          <div className="p-8 text-center">
            <div className="max-w-sm mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                No posts from people you follow
              </h3>
              <p className="text-gray-400 mb-6">
                Posts from people you follow will appear here.
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8 text-center">
            <p className="text-gray-400">Content for {activeTab}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {renderContent()}
    </div>
  );
}
