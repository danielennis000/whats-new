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
- **Production**: An Express server is included to proxy requests and serve the built application

## Deployment

To deploy to a production server:

1. Create a repository secret for the password:
   - Go to your repository settings
   - Select "Secrets and variables" > "Actions"
   - Add a new repository secret with the name `VITE_APP_PASSWORD` and the password value

2. For GitHub Pages (static hosting without server-side proxying):
   ```
   npm run deploy
   ```
   **Note:** The RSS feed will not function on GitHub Pages due to CORS restrictions. A real backend would be needed.

3. For hosting with server capabilities:
   - Deploy both the built React app and the Express server
   - Set up the server to run with:
   ```
   node server/index.js
   ```

## Built With

- React
- Vite
- Tailwind CSS
- React Router
- Express (for server-side proxy)