export type Profile = {
  id: string;
  name: string;                    // From signup form
  username: string;                // From signup form
  email: string;                   // From signup form
  bio: string | null;              // Optional, from edit form
  avatar_url: string | null;       // Profile picture
  header_url: string | null;       // Header image
  created_at: string;
  updated_at: string;
};

export type ProfileStats = {
  followers: number;
  following: number;
};

export type ProfileWithStats = Profile & ProfileStats;

export type UpdateProfileInput = {
  name: string;                    // Update the name field
  bio?: string;                    // Optional bio
};

export type FollowUserInput = {
  following_id: string;
};

export type UnfollowUserInput = {
  following_id: string;
};

export type ImageUploadResult = {
  url: string;
  path: string;
};

export type ProfileFormData = {
  name: string;                    // Update to match new schema
  bio: string;
  avatar_picture?: File;           // Update to match new schema
  header_image?: File;
};
