interface ProfileStatsProps {
  followers: number;
  following: number;
}

export function ProfileStats({ followers, following }: ProfileStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="px-4 md:px-6 pb-4">
      <div className="flex space-x-6 text-sm">
        <div className="flex space-x-1">
          <span className="text-white font-semibold">
            {formatNumber(following)}
          </span>
          <span className="text-gray-400">Following</span>
        </div>
        <div className="flex space-x-1">
          <span className="text-white font-semibold">
            {formatNumber(followers)}
          </span>
          <span className="text-gray-400">Followers</span>
        </div>
      </div>
    </div>
  );
}