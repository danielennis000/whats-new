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

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173/whats-new/
   ```

6. Login using the password you set in the environment variable

## Deployment

To deploy to GitHub Pages:

1. Create a repository secret for the password in GitHub:
   - Go to your repository settings
   - Select "Secrets and variables" > "Actions"
   - Add a new repository secret with the name `VITE_APP_PASSWORD` and the password value

2. Deploy the application:
   ```
   npm run deploy
   ```

This will build the project and deploy it to the `gh-pages` branch of your repository.

The deployed application will be available at:
https://danielennis000.github.io/whats-new/

## Built With

- React
- Vite
- Tailwind CSS
- React Router
- RSS Parser