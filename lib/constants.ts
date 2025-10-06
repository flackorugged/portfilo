/**
 * Application-wide constants
 * Use these instead of magic strings/numbers throughout the codebase
 */

/**
 * Database table names
 */
export const TABLES = {
  PROFILES: 'profiles',
  FOLLOWS: 'follows',
  POSTS: 'posts',
} as const;

/**
 * Supabase storage bucket names
 */
export const STORAGE_BUCKETS = {
  PROFILE_PICTURES: 'profile-pictures',
  HEADER_IMAGES: 'header-images',
} as const;

/**
 * Layout dimensions and spacing
 */
export const LAYOUT = {
  // Header heights
  HEADER_HEIGHT: 192, // 48 * 4 = 192px (mobile)
  HEADER_HEIGHT_MD: 256, // 64 * 4 = 256px (desktop)
  
  // Avatar sizes
  AVATAR_SIZE_SM: 96, // 24 * 4 = 96px (mobile)
  AVATAR_SIZE_MD: 128, // 32 * 4 = 128px (desktop)
  
  // Avatar overlap (how much avatar overlaps header)
  AVATAR_OVERLAP_SM: 48, // Half of small avatar
  AVATAR_OVERLAP_MD: 64, // Half of medium avatar
  
  // Calculated positions
  EDIT_BUTTON_TOP_SM: 216, // HEADER_HEIGHT + (AVATAR_SIZE_SM - AVATAR_OVERLAP_SM)
  EDIT_BUTTON_TOP_MD: 284, // HEADER_HEIGHT_MD + (AVATAR_SIZE_MD - AVATAR_OVERLAP_MD)
} as const;

/**
 * File upload constraints
 */
export const FILE_UPLOAD = {
  // Max file sizes in bytes
  MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
  MAX_HEADER_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Allowed MIME types
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const,
  
  // Display names for error messages
  ALLOWED_IMAGE_TYPES_DISPLAY: 'JPEG, PNG, or WebP',
} as const;

/**
 * Form validation constraints
 */
export const VALIDATION = {
  // Profile fields
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 160,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  
  // Password
  PASSWORD_MIN_LENGTH: 8,
} as const;

/**
 * Route paths
 */
export const ROUTES = {
  HOME: '/home',
  PROFILE: '/profile',
  SEARCH: '/search',
  NOTIFICATIONS: '/notifications',
  MORE: '/more',
  AUTH: '/',
} as const;

/**
 * Cache revalidation times (in seconds)
 */
export const CACHE = {
  PROFILE: 60, // 1 minute
  POSTS: 30, // 30 seconds
  FEED: 30, // 30 seconds
} as const;

/**
 * Rate limiting
 */
export const RATE_LIMITS = {
  PROFILE_UPDATE: {
    MAX_REQUESTS: 10,
    WINDOW: '10s',
  },
  FILE_UPLOAD: {
    MAX_REQUESTS: 5,
    WINDOW: '1m',
  },
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

/**
 * Toast notification durations (in milliseconds)
 */
export const TOAST = {
  SUCCESS_DURATION: 3000,
  ERROR_DURATION: 5000,
  INFO_DURATION: 3000,
} as const;

