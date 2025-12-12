import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */

  
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    TELEGRAM_BOT_TOKEN: z.string().min(1),
    TELEGRAM_CHAT_ID: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1).optional(),
    SPOTIFY_REDIRECT_URI: z.string().url().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_URL: z.url(),
    NEXT_PUBLIC_UMAMI_SRC: z.url().optional(),
    NEXT_PUBLIC_UMAMI_ID: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_UMAMI_SRC: process.env.NEXT_PUBLIC_UMAMI_SRC,
    NEXT_PUBLIC_UMAMI_ID: process.env.NEXT_PUBLIC_UMAMI_ID,
  },
  /**
   * Run `build` or `dev` with SKIP_ENV_VALIDATION to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */


  
  emptyStringAsUndefined: true,
});

