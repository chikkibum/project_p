import { env } from './env';

/**
 * Gets the Spotify Client ID from environment variables
 * @throws Error if SPOTIFY_CLIENT_ID is not configured
 */
export function getSpotifyClientId(): string {
  return env.SPOTIFY_CLIENT_ID;
}

/**
 * Gets the Spotify Client Secret from environment variables
 * @throws Error if SPOTIFY_CLIENT_SECRET is not configured
 */
export function getSpotifyClientSecret(): string {
  return env.SPOTIFY_CLIENT_SECRET;
}

/**
 * Gets the Spotify Refresh Token from environment variables
 * @throws Error if SPOTIFY_REFRESH_TOKEN is not configured
 */
export function getSpotifyRefreshToken(): string {
  const refreshToken = env.SPOTIFY_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error('SPOTIFY_REFRESH_TOKEN is not configured');
  }
  return refreshToken;
}

/**
 * Gets the Spotify Redirect URI from environment variables
 * @param fallback Optional fallback URI (defaults to localhost:3000 callback)
 * @returns The redirect URI or fallback if not configured
 */
export function getSpotifyRedirectUri(fallback?: string): string {
  return env.SPOTIFY_REDIRECT_URI || fallback || 'http://localhost:3000/api/spotify/callback';
}

/**
 * Gets Spotify credentials as an object
 * @returns Object containing clientId, clientSecret, and optionally refreshToken and redirectUri
 */
export function getSpotifyCredentials() {
  return {
    clientId: getSpotifyClientId(),
    clientSecret: getSpotifyClientSecret(),
    refreshToken: env.SPOTIFY_REFRESH_TOKEN,
    redirectUri: getSpotifyRedirectUri(),
  };
}

/**
 * Creates a Basic Auth header for Spotify API requests
 * @returns Base64 encoded Basic Auth string
 */
export function getSpotifyBasicAuth(): string {
  const clientId = getSpotifyClientId();
  const clientSecret = getSpotifyClientSecret();
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
}

