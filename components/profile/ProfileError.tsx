'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ProfileErrorProps {
  error: { message: string };
  userId: string;
}

export function ProfileError({ error }: ProfileErrorProps) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Profile Error</h2>
        <p className="text-gray-400 mb-6">
          {error.message || 'Something went wrong loading your profile.'}
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/home'}
            className="w-full border-gray-700 text-gray-400 hover:text-white"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
