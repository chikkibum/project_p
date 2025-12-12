import { NextRequest, NextResponse } from 'next/server';
import { generateRandomString, getAuthorizationUrl } from '@/lib/spotify-auth';
import { env } from '@/lib/env';

/**
 * GET /api/spotify/login
 * Initiates Spotify OAuth flow by redirecting to Spotify authorization page
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // Generate random state for CSRF protection
    const state = generateRandomString(16);

    // Store state in a cookie for verification in callback
    const response = NextResponse.redirect(getAuthorizationUrl(state));
    
    // Set cookie with httpOnly and secure flags
    response.cookies.set('spotify_auth_state', state, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error initiating Spotify login:', error);
    return NextResponse.json(
      { error: 'Failed to initiate login', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

