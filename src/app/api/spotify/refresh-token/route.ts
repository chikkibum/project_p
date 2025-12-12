import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/spotify';
import {
  getSpotifyBasicAuth,
  getSpotifyRefreshToken,
} from '@/lib/spotify-env';

/**
 * GET /api/spotify/refresh-token?refresh_token=xxx
 * Manually refresh Spotify access token
 * 
 * This endpoint matches the Spotify example pattern:
 * - If refresh_token is provided in query, uses it
 * - Otherwise, uses SPOTIFY_REFRESH_TOKEN from environment variables
 * - Returns both access_token and refresh_token (uses new one if provided)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const refreshTokenParam = searchParams.get('refresh_token');

    // Use refresh_token from query param if provided, otherwise from env
    const refreshToken = refreshTokenParam || getSpotifyRefreshToken();
    const basicAuth = getSpotifyBasicAuth();

    // Refresh the token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: basicAuth,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Failed to refresh token: ${response.status} ${errorText}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Return access_token and refresh_token (use new one if provided, otherwise keep the old one)
    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token || refreshToken,
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

