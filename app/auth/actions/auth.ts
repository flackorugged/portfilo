"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

export async function signOut() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath("/");
  redirect("/");
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath("/");
  return { success: true, user: data.user };
}

export async function signUp(email: string, password: string, userData: {
  name: string;
  username: string;
}) {
  const supabase = await createClient();
  
  // First, check if username is already taken
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", userData.username)
    .single();

  if (existingProfile) {
    throw new Error("Username is already taken");
  }
  
  // The trigger will create the profile automatically
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        username: userData.username,
        name: userData.name,
      },
    },
  });
  
  if (error) {
    console.error('SignUp error:', error);
    throw new Error(`Signup failed: ${error.message}`);
  }
  
  revalidatePath("/");
  return { success: true, user: data.user };
}

// REMOVED: updateUserProfile and ensureUserProfile - use updateProfile from profile actions instead