import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '@/lib/env'
import type { Database } from '@/types/supabase'

/**
 * Updates the user session and handles authentication
 * Also adds security headers to the response
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    // IMPORTANT: DO NOT REMOVE auth.getUser()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    
    // Log auth errors but don't crash
    if (userError) {
      console.error('Middleware auth error:', userError);
    }

  // Handle route protection
  if (!user) {
    // If user is not logged in and trying to access protected routes, redirect to home
    if (request.nextUrl.pathname.startsWith('/home') || 
        request.nextUrl.pathname.startsWith('/profile') ||
        request.nextUrl.pathname.startsWith('/search') ||
        request.nextUrl.pathname.startsWith('/notifications') ||
        request.nextUrl.pathname.startsWith('/messages') ||
        request.nextUrl.pathname.startsWith('/more') ||
        request.nextUrl.pathname.startsWith('/protected')) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  } else {
    // If user is logged in and on the landing page, redirect to home
    if (request.nextUrl.pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/home'
      return NextResponse.redirect(url)
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  // Add security headers
  supabaseResponse.headers.set('X-Frame-Options', 'DENY');
  supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff');
  supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  supabaseResponse.headers.set('X-XSS-Protection', '1; mode=block');
  supabaseResponse.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  
    // Content Security Policy - CRITICAL: Must allow Supabase API connections
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://*.supabase.co;
      font-src 'self';
      connect-src 'self' https://*.supabase.co wss://*.supabase.co;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();
    
    supabaseResponse.headers.set('Content-Security-Policy', cspHeader);

    return supabaseResponse;
  } catch (error) {
    // If middleware fails, log but don't crash
    console.error('Middleware error:', error);
    return supabaseResponse;
  }
}