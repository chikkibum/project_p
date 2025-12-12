import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/spotify-auth';

/**
 * GET /api/spotify/callback
 * Handles Spotify OAuth callback and exchanges authorization code for tokens
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Handle OAuth errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error)}`, request.url),
    );
  }

  // Verify state parameter for CSRF protection
  const storedState = request.cookies.get('spotify_auth_state')?.value;

  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL('/?error=state_mismatch', request.url),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/?error=missing_code', request.url),
    );
  }

  try {
    // Exchange authorization code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Clear the state cookie
    const response = NextResponse.redirect(
      new URL(
        `/?access_token=${encodeURIComponent(tokens.access_token)}&refresh_token=${encodeURIComponent(tokens.refresh_token)}`,
        request.url,
      ),
    );

    response.cookies.delete('spotify_auth_state');

    // Optionally store tokens in cookies (not recommended for production)
    // For production, you should store these securely server-side
    if (process.env.NODE_ENV === 'development') {
      response.cookies.set('spotify_access_token', tokens.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: tokens.expires_in,
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.redirect(
      new URL(
        `/?error=${encodeURIComponent(error instanceof Error ? error.message : 'invalid_token')}`,
        request.url,
      ),
    );
  }
}

