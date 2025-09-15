# What's New Prototype

A prototype for a "What's New" section and product release notes page based on Figma design.

## Features

- Dashboard with "What's New" section showing recent updates
- Dedicated "What's New" page displaying more updates and RSS feed
- Password protection (password: `aiacceleration`)
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

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/whats-new/
   ```

5. Login with password: `aiacceleration`

## Deployment

To deploy to GitHub Pages:

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