import { getUser, getUserProfile } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const user = await getUser();
  
  if (!user) {
    redirect("/");
  }

  const profile = await getUserProfile(user.id);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to PortFilo</h1>
          <div className="flex space-x-4">
            <Link href="/profile">
              <Button 
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10"
              >
                View Profile
              </Button>
            </Link>
            <form action={signOut}>
              <Button 
                type="submit"
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </div>

        <Card className="bg-off-black border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-400">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            
            {profile && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <p className="text-white">{profile.name || "Not set"}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-400">Username</label>
                  <p className="text-white">@{profile.username || "Not set"}</p>
                </div>
                
                {profile.bio && (
                  <div>
                    <label className="text-sm font-medium text-gray-400">Bio</label>
                    <p className="text-white">{profile.bio}</p>
                  </div>
                )}
              </>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-400">User ID</label>
              <p className="text-white text-sm font-mono">{user.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
