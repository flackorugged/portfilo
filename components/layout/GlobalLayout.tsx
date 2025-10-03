import { getUser } from "@/utils/supabase/server";
import { getCurrentUserProfile } from "@/app/actions/profile";
import { AppLayout } from "./AppLayout";
import { redirect } from "next/navigation";

interface GlobalLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  showRightSidebar?: boolean;
}

export async function GlobalLayout({ 
  children, 
  requireAuth = true,
  showRightSidebar = true 
}: GlobalLayoutProps) {
  // If auth is required, check user and redirect if not authenticated
  if (requireAuth) {
    const user = await getUser();
    
    if (!user) {
      redirect("/");
    }

    // Get user profile for navigation
    const { profile } = await getCurrentUserProfile();

    return (
      <AppLayout 
        user={user} 
        profile={profile} 
        showRightSidebar={showRightSidebar}
      >
        {children}
      </AppLayout>
    );
  }

  // For public pages (like auth pages), render without navigation
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  );
}
