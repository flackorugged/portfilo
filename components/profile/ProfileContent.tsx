"use client";

interface ProfileContentProps {
  activeTab: string;
}

export function ProfileContent({ activeTab }: ProfileContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "portfolio":
        return (
          <div className="p-8 text-center">
            <div className="max-w-sm mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                No portfolio yet
              </h3>
              <p className="text-gray-400 mb-6">
                When you add investments to your portfolio, they&apos;ll show up here.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2 rounded-full">
                Add Investment
              </button>
            </div>
          </div>
        );
      
      case "posts":
        return (
          <div className="p-8 text-center">
            <div className="max-w-sm mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-400 mb-6">
                When you post something, it&apos;ll show up here.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-black font-semibold px-6 py-2 rounded-full">
                Post now
              </button>
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
