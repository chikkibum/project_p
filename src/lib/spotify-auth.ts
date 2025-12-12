import crypto from 'crypto';
import {
  getSpotifyClientId,
  getSpotifyRedirectUri,
  getSpotifyBasicAuth,
} from './spotify-env';

/**
 * Generates a random string for state parameter in OAuth flow
 */
export function generateRandomString(length: number): string {
  return crypto.randomBytes(60).toString('hex').slice(0, length);
}

/**
 * Gets the Spotify authorization URL for OAuth flow
 */
export function getAuthorizationUrl(state: string): string {
  const clientId = getSpotifyClientId();
  const redirectUri = getSpotifyRedirectUri();
  const scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-read-recently-played';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * Exchanges authorization code for access and refresh tokens
 */
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}> {
  const redirectUri = getSpotifyRedirectUri();
  const basicAuth = getSpotifyBasicAuth();

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: basicAuth,
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange code for tokens: ${response.status} ${errorText}`);
  }

  return await response.json();
}

