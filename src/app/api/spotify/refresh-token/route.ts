import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/spotify';

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

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Spotify credentials are not configured' },
        { status: 500 },
      );
    }

    // Use refresh_token from query param if provided, otherwise from env
    const refreshToken = refreshTokenParam || process.env.SPOTIFY_REFRESH_TOKEN;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token not provided' },
        { status: 400 },
      );
    }

    // Refresh the token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
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

