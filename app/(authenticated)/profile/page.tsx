import { getUser } from "@/utils/supabase/server";
import ProfileContent from "@/components/profile/ProfileContent";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();
  
  if (!user) {
    redirect("/");
  }

  return <ProfileContent userId={user.id} />;
}
