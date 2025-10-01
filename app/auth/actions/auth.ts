"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      data: {
        username: userData.username,
        name: userData.name,
      },
    },
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath("/");
  return { success: true, user: data.user };
}

export async function updateUserProfile(userId: string, profileData: {
  name: string;
  username: string;
}) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("profiles")
    .update({
      name: profileData.name,
      username: profileData.username,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Profile update failed: ${error.message}`);
  }
}

export async function ensureUserProfile(userId: string, profileData: {
  name: string;
  username: string;
}) {
  const supabase = await createClient();
  
  // First check if profile exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (existingProfile) {
    // Profile exists, update it if needed
    if (existingProfile.username !== profileData.username || existingProfile.name !== profileData.name) {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: profileData.name,
          username: profileData.username,
        })
        .eq("id", userId);

      if (error) {
        throw new Error(`Profile update failed: ${error.message}`);
      }
    }
  } else {
    // Profile doesn't exist, create it
    const { error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        name: profileData.name,
        username: profileData.username,
      });

    if (error) {
      throw new Error(`Profile creation failed: ${error.message}`);
    }
  }
}
