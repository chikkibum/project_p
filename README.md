# Sleek Portfolio by ramxcodes

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI. Features a blog system, project showcase, work experience timeline, and contact form with Telegram integration.

![Portfolio Preview](/public/meta/hero.png)

## Deploy 

Click here to your portfolio template now:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Framxcodes%2Fsleek-portfolio&env=TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID,GEMINI_API_KEY,NEXT_PUBLIC_URL,NEXT_PUBLIC_UMAMI_SRC,NEXT_PUBLIC_UMAMI_ID)

## Features

- **Next.js 15** with App Router
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Dark/Light** mode
- **Responsive** design
- **MDX** for blog posts and project details
- **Contact Form** with Telegram integration
- **Spotify Integration** - Display currently playing track
- **SEO** optimized
- **TypeScript** for type safety
- **Umami Analytics** for privacy-focused web analytics

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Bun (preferred) or npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TELEGRAM_BOT_TOKEN="your-token"
TELEGRAM_CHAT_ID="your-chat-id"
GEMINI_API_KEY="your-api-key"
NODE_ENV="development"
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_UMAMI_SRC="your-umami-script-url"
NEXT_PUBLIC_UMAMI_ID="your-umami-website-id"
SPOTIFY_CLIENT_ID="your-spotify-client-id"
SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
SPOTIFY_REFRESH_TOKEN="your-spotify-refresh-token"
```

### Setting up Telegram Integration

1. Create a new bot with [@BotFather](https://t.me/botfather) on Telegram
2. Copy the bot token provided
3. Start a chat with your bot
4. Get your chat ID by:
   - Add your `bot` in a group as `admin`
   - Then send `/id` to [@rosebot](https://t.me/MissRose_bot)
   - Boom! you get your `id`

### Setting up Umami Analytics

1. Visit Umami:
   - Self-host Umami or use [Umami Cloud](https://cloud.umami.is)
   - Follow Umami's [installation guide](https://umami.is/docs/install)

2. Get your credentials:
   - Copy your Umami script URL (ends with `/script.js`)
   - Get your website ID from Umami dashboard

3. Configure environment variables:
   ```env
   NEXT_PUBLIC_UMAMI_SRC="https://[your-umami-instance]/script.js"
   NEXT_PUBLIC_UMAMI_ID="your-website-id"
   ```

### Setting up Spotify Integration

1. Create a Spotify app:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Click "Create an app"
   - Fill in app name and description
   - Accept the terms and create

2. Get your credentials:
   - Copy your **Client ID** and **Client Secret** from the app dashboard
   - Add a redirect URI: `http://localhost:3000/api/spotify/callback` (for development)
   - For production, add your production URL: `https://yourdomain.com/api/spotify/callback`

3. Configure environment variables:
   ```env
   SPOTIFY_CLIENT_ID="your-client-id"
   SPOTIFY_CLIENT_SECRET="your-client-secret"
   SPOTIFY_REDIRECT_URI="http://localhost:3000/api/spotify/callback" # Optional, defaults to localhost:3000
   SPOTIFY_REFRESH_TOKEN="your-refresh-token" # Optional initially, will be obtained via OAuth flow
   ```

4. Obtain a refresh token (two methods):

   **Method 1: Using the OAuth flow (Recommended)**
   - Start your development server: `npm run dev`
   - Visit: `http://localhost:3000/api/spotify/login`
   - You'll be redirected to Spotify to authorize the app
   - After authorization, you'll be redirected back with `access_token` and `refresh_token` in the URL
   - Copy the `refresh_token` from the URL and add it to your `.env` file

   **Method 2: Manual setup**
   - Use a tool like [Spotify OAuth Helper](https://github.com/spotify/web-api-auth-examples)
   - Follow Spotify's [Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
   - Complete the OAuth flow to get your refresh token

5. **API Endpoints:**
   - `GET /api/spotify/login` - Initiates OAuth flow
   - `GET /api/spotify/callback` - Handles OAuth callback
   - `GET /api/spotify/refresh-token?refresh_token=xxx` - Manually refresh tokens
   - `GET /api/spotify/now-playing` - Get currently playing track

**Note:** The Spotify widget will automatically refresh every 30 seconds to show your currently playing track. Make sure your Spotify account has music playing for it to display.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ramxcodes/sleek-portfolio.git
   cd sleek-portfolio
   ```

2. Install dependencies:

   ```bash
   # Using bun (recommended)
   bun install

   # Using npm
   npm install
   ```

3. Run the development server:

   ```bash
   # Using bun
   bun dev

   # Using npm
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The project uses configuration files in the `src/config` directory for easy customization:

- `About.tsx` - About section content
- `Contact.tsx` - Contact form settings
- `Experience.tsx` - Work experience details
- `Footer.tsx` - Footer links and content
- `Gears.tsx` - Setup/gear section
- `Hero.tsx` - Hero section content
- `Meta.tsx` - SEO and metadata
- `Navbar.tsx` - Navigation links
- `Projects.tsx` - Project showcase settings
- `Quote.ts` - Random quotes configuration
- `Resume.ts` - Resume section details
- `Setup.tsx` - Development setup information
- `cat.ts` - Enable disable the cat

## Adding New Technology Icons

1. Visit [Devicon](https://devicon.dev/) to find the icon you want to add
2. Create a new component in `src/components/technologies/`
3. Follow the existing component structure for consistency

Example:

```tsx
export const NewTechIcon = () => {
  return <svg>// SVG content from devicon</svg>;
};
```

## Adding Content

### Blog Posts

1. Create a new MDX file in `src/data/blog/`
2. Add metadata and content following existing post structure
3. Add blog thumbnail in `public/blog/`

### Projects

1. Create a new MDX file in `src/data/projects/`
2. Add metadata and content following existing project structure
3. Add project thumbnail in `public/project/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
