import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';
import type {
  CurrentlyPlayingResponse,
  SimplifiedTrack,
  RecentlyPlayedResponse,
} from '@/types/spotify';

/**
 * GET /api/spotify/now-playing
 * Returns the currently playing track from Spotify
 */
export async function GET() {
  try {
    // Get a valid access token
    const accessToken = await getAccessToken();

    // Fetch currently playing track from Spotify
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // Handle 204 No Content (nothing is playing)
    if (response.status === 204) {
      // Try to get last played track
      return await getLastPlayedTrack(accessToken);
    }

    // Handle other non-OK responses
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try refreshing and retry once
        const newToken = await getAccessToken();
        const retryResponse = await fetch(
          'https://api.spotify.com/v1/me/player/currently-playing',
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          },
        );

        if (retryResponse.status === 204) {
          // Try to get last played track
          return await getLastPlayedTrack(newToken);
        }

        if (!retryResponse.ok) {
          return NextResponse.json(
            { error: 'Failed to fetch currently playing track' },
            { status: retryResponse.status },
          );
        }

        const retryData: CurrentlyPlayingResponse =
          await retryResponse.json();
        return NextResponse.json(transformTrackData(retryData));
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60,
          },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch currently playing track' },
        { status: response.status },
      );
    }

    const data: CurrentlyPlayingResponse = await response.json();

    // Handle null item (no track playing)
    if (!data.item) {
      // Try to get last played track
      return await getLastPlayedTrack(accessToken);
    }

    return NextResponse.json(transformTrackData(data));
  } catch (error) {
    console.error('Error fetching Spotify currently playing:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * Fetches the last played track from Spotify
 */
async function getLastPlayedTrack(
  accessToken: string,
): Promise<NextResponse> {
  try {
    const response = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      // If we can't get recently played, return null
      return NextResponse.json({ track: null, isPlaying: false });
    }

    const data: RecentlyPlayedResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ track: null, isPlaying: false });
    }

    const lastPlayed = data.items[0];
    const track = lastPlayed.track;
    const artists = track.artists.map((artist) => artist.name).join(', ');
    const albumArt =
      track.album.images && track.album.images.length > 0
        ? track.album.images[0].url
        : null;

    const simplifiedTrack: SimplifiedTrack = {
      name: track.name,
      artist: artists,
      albumArt,
      isPlaying: false,
      spotifyUrl: track.external_urls.spotify,
      duration: track.duration_ms,
      playedAt: lastPlayed.played_at,
    };

    return NextResponse.json({
      track: simplifiedTrack,
      isPlaying: false,
      isLastPlayed: true,
    });
  } catch (error) {
    console.error('Error fetching last played track:', error);
    return NextResponse.json({ track: null, isPlaying: false });
  }
}

/**
 * Transforms Spotify API response to simplified track data
 */
function transformTrackData(data: CurrentlyPlayingResponse): {
  track: SimplifiedTrack | null;
  isPlaying: boolean;
} {
  if (!data.item) {
    return { track: null, isPlaying: false };
  }

  const track = data.item;
  const artists = track.artists.map((artist) => artist.name).join(', ');
  const albumArt =
    track.album.images && track.album.images.length > 0
      ? track.album.images[0].url
      : null;

  const simplifiedTrack: SimplifiedTrack = {
    name: track.name,
    artist: artists,
    albumArt,
    isPlaying: data.is_playing,
    spotifyUrl: track.external_urls.spotify,
    progress: data.progress_ms,
    duration: track.duration_ms,
  };

  return {
    track: simplifiedTrack,
    isPlaying: data.is_playing,
  };
}

