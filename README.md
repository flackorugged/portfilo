# PortFilo

A modern Next.js application with Supabase authentication, built with TypeScript and TailwindCSS.

## Features

- **Server-Side Rendering (SSR)** with Next.js 15 App Router
- **Password-based Authentication** using Supabase Auth
- **Protected Routes** with middleware-based route protection
- **User Profiles** with custom data storage
- **Modern UI** built with shadcn/ui components
- **TypeScript** strict mode for type safety

## Authentication Flow

- **Public Route**: `/` (landing page with integrated auth forms)
- **Protected Route**: `/home` (user dashboard)
- **Automatic Redirects**: 
  - Logged-in users visiting `/` → redirected to `/home`
  - Logged-out users visiting `/home` → redirected to `/`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **TypeScript**: Strict mode

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 2. Database Setup

Run the SQL commands in `supabase-setup.sql` in your Supabase SQL editor:

```sql
-- This will create:
-- 1. profiles table with RLS policies
-- 2. Automatic profile creation trigger
-- 3. Updated_at timestamp trigger
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## Project Structure

```
app/
├── auth/
│   ├── actions/          # Server actions for auth
│   ├── components/       # Auth form components
│   └── lib/             # Validation schemas
├── home/                # Protected home page
├── layout.tsx           # Root layout
└── page.tsx             # Landing page with auth forms

utils/supabase/
├── client.ts            # Client-side Supabase client
├── server.ts            # Server-side Supabase client + helpers
└── middleware.ts        # Middleware for session management

types/
└── supabase.ts          # TypeScript types for database
```

## Key Features

### Server-Side Authentication

- Uses `createServerComponentClient` for SSR
- Always uses `supabase.auth.getUser()` in Server Components
- Session persistence across refreshes

### Route Protection

- Middleware handles automatic redirects
- No client-side route guards needed
- Server-side session validation

### User Profiles

- Automatic profile creation on signup
- Custom user data storage
- RLS policies for data security

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Best Practices Implemented

1. **SSR-First**: All authentication logic runs on the server
2. **Type Safety**: Full TypeScript coverage with strict mode
3. **Security**: RLS policies and server-side validation
4. **Performance**: Optimized builds with Next.js 15
5. **UX**: Seamless authentication flow with automatic redirects