import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Ensure profile is created with correct data after email verification
      const username = data.user.user_metadata?.username
      const name = data.user.user_metadata?.name
      
      if (username && name) {
        try {
          // Check if profile exists
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single()

          if (!existingProfile) {
            // Create profile if it doesn't exist
            await supabase
              .from("profiles")
              .insert({
                id: data.user.id,
                username: username,
                name: name,
              })
          } else if (existingProfile.username !== username || existingProfile.name !== name) {
            // Update profile if data is different
            await supabase
              .from("profiles")
              .update({
                username: username,
                name: name,
              })
              .eq("id", data.user.id)
          }
        } catch (profileError) {
          console.error('Profile creation/update error:', profileError)
          // Don't fail the auth flow if profile creation fails
        }
      }
      
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
