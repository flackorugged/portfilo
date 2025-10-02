import { getUser, getUserProfile } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileLayout } from "@/components/profile/ProfileLayout";

export default async function ProfilePage() {
  const user = await getUser();
  
  if (!user) {
    redirect("/");
  }

  const profile = await getUserProfile(user.id);

  return (
    <ProfileLayout user={user} profile={profile} />
  );
}
