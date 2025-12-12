import type { TokenResponse } from '@/types/spotify';
import {
  getSpotifyBasicAuth,
  getSpotifyRefreshToken,
} from './spotify-env';

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
  const refreshToken = getSpotifyRefreshToken();
  const basicAuth = getSpotifyBasicAuth();

  try {
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

