# What's New Prototype

A prototype for a "What's New" section and product release notes page based on Figma design.

## Features

- Dashboard with "What's New" section showing recent updates
- Dedicated "What's New" page displaying more updates and RSS feed
- Password protected interface
- Responsive design using Tailwind CSS
- RSS feed integration from ai.asu.edu

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/danielennis000/whats-new.git
   cd whats-new
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following (replace with the actual password):
   ```
   VITE_APP_PASSWORD=your_password_here
   ```
   - Add `.env` to your `.gitignore` file

4. Development Options:

   **Option A: Use Vite's development server with CORS proxy:**
   ```
   npm run dev
   ```
   This option uses Vite's built-in proxy to fetch the RSS feed during development.
   
   **Option B: Use Express server (better represents production):**
   ```
   npm run start
   ```
   This builds the app and serves it with Express, handling the RSS feed proxy server-side.

5. Open your browser and navigate to:
   - For Option A: `http://localhost:5173/whats-new/`
   - For Option B: `http://localhost:3000/whats-new/`

6. Login using the password you set in the environment variable

## RSS Feed Integration

The application fetches the RSS feed from ai.asu.edu/taxonomy/term/1/feed. Due to CORS restrictions, this requires a proxy:

- **Development**: The Vite development server includes a configured proxy
- **Production**: Multiple options are supported:
  - Express server (for self-hosted deployment)
  - Netlify redirects and functions (for Netlify deployment)

## Deployment Options

### 1. GitHub Pages Deployment

To deploy to GitHub Pages (note: RSS feed will require a CORS proxy):

1. Create a repository secret for the password:
   - Go to your repository settings
   - Select "Secrets and variables" > "Actions"
   - Add a new repository secret with the name `VITE_APP_PASSWORD` and the password value

2. Deploy the application:
   ```
   npm run deploy
   ```

This will build the project and deploy it to the `gh-pages` branch of your repository.
The deployed application will be available at: `https://danielennis000.github.io/whats-new/`

### 2. Netlify Deployment

Netlify deployment includes a built-in CORS proxy for the RSS feed using Netlify redirects:

1. Connect your GitHub repository to Netlify
2. Add the environment variable `VITE_APP_PASSWORD` in Netlify settings
3. Use the following build settings:
   - Build command: `npm run netlify-build`
   - Publish directory: `dist`
4. Deploy!

The Netlify deployment will automatically handle:
- CORS proxy for the RSS feed
- Proper routing for SPA navigation
- Environment variables for password protection

## Project Structure

- `src/` - React application source
- `server/` - Express server for local/self-hosted deployment
- `functions/` - Serverless functions for Netlify deployment
- `public/` - Static assets
- `netlify.toml` - Netlify configuration including redirects for CORS proxy

## Built With

- React
- Vite
- Tailwind CSS
- React Router
- Express (for server-side proxy)
- Netlify Functions (for serverless deployment)