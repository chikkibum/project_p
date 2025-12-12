'use client';

import ImageWithPlaceholder from '@/components/common/ImageWithPlaceholder';
import { Skeleton } from '@/components/ui/skeleton';
import type { SimplifiedTrack } from '@/types/spotify';
import { Music, Pause, Play } from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useEffect, useState } from 'react';

import { MusicToggleButton } from '../ui/toggle-music';

interface SpotifyNowPlayingProps {
  refreshInterval?: number; // in milliseconds, default 30000 (30 seconds)
}

interface SpotifyResponse {
  track: SimplifiedTrack | null;
  isPlaying: boolean;
  isLastPlayed?: boolean;
  error?: string;
}

export default function SpotifyNowPlaying({
  refreshInterval = 30000,
}: SpotifyNowPlayingProps) {
  const [data, setData] = useState<SpotifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNowPlaying = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/spotify/now-playing');

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = (await response.json()).retryAfter || 60;
          setError(`Rate limited. Retry after ${retryAfter} seconds.`);
          return;
        }
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const result: SpotifyResponse = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching Spotify data:', err);
      setError('Failed to load currently playing track');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNowPlaying();

    // Set up auto-refresh interval
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Loading state
  if (isLoading && !data) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
            <Music className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Spotify</p>
            <p className="text-xs">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No track playing state
  if (!data?.track) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
            <Music className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Not currently playing</p>
            <p className="text-xs">Start playing something on Spotify</p>
          </div>
        </div>
      </div>
    );
  }

  const { track } = data;
  const isLastPlayed = data.isLastPlayed || false;

  // Format played at time if available
  const getPlayedAtText = () => {
    if (!track.playedAt) return null;
    const playedDate = new Date(track.playedAt);
    const now = new Date();
    const diffMs = now.getTime() - playedDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return playedDate.toLocaleDateString();
  };

  return (
    <div className="mt-8 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50">
      <Link
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 group"
      >
        {/* Album Art */}
        {track.albumArt ? (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
            <ImageWithPlaceholder
              src={track.albumArt}
              alt={`${track.name} album art`}
              width={64}
              height={64}
              className="object-cover transition-transform group-hover:scale-105"
            />
            {/* Play/Pause overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              {track.isPlaying ? (
                <Pause className="h-6 w-6 text-white" />
              ) : (
                <Play className="h-6 w-6 text-white" />
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted">
            <Music className="h-8 w-8 text-muted-foreground" />
          </div>
        )}

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center gap-1.5">
              {track.isPlaying ? (
                <span className="text-xs text-muted-foreground font-medium">
                  Now playing
                </span>
              ) : (
                isLastPlayed && (
                  <>
                    {/* Spotify Icon */}
                    <svg
                      className="h-3.5 w-3.5 text-[#1DB954]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    <span className="text-xs text-muted-foreground font-medium">
                      Last played
                    </span>
                  </>
                )
              )}
            </div>
            <p className="text-sm font-medium truncate-2-lines group-hover:text-primary transition-colors">
              {track.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground truncate">
              {track.artist}
            </p>
            {isLastPlayed && track.playedAt && (
              <span className="text-xs text-muted-foreground">•</span>
            )}
            {isLastPlayed && track.playedAt && (
              <p className="text-xs text-muted-foreground">
                {getPlayedAtText()}
              </p>
            )}
          </div>
        </div>

        {/* Music Toggle Button - Right Side */}
        <div className="flex-shrink-0">
          <MusicToggleButton playing={track.isPlaying} />
        </div>

        {/* External link indicator */}
        <div className="flex-shrink-0 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}
