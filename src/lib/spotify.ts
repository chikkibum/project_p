import type { TokenResponse } from '@/types/spotify';

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: CachedToken | null = null;

/**
 * Refreshes the Spotify access token using the refresh token
 * @returns Promise<string> The new access token
 */
export async function refreshAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  console.log(`Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`);





  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Spotify credentials are not configured');
  }

  try {
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
      throw new Error(`Failed to refresh token: ${response.status} ${errorText}`);
    }

    const data: TokenResponse = await response.json();

    // Cache the token with expiration time (subtract 60 seconds for safety margin)
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Spotify token:', error);
    throw error;
  }
}

/**
 * Gets a valid access token, refreshing if necessary
 * @returns Promise<string> A valid access token
 */
export async function getAccessToken(): Promise<string> {
  // Check if cached token is still valid
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.accessToken;
  }

  // Token expired or doesn't exist, refresh it
  return await refreshAccessToken();
}

