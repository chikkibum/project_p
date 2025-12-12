import crypto from 'crypto';

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
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';
  const scope = 'user-read-private user-read-email user-read-currently-playing user-read-playback-state user-read-recently-played';

  if (!clientId) {
    throw new Error('SPOTIFY_CLIENT_ID is not configured');
  }

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
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials are not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
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

