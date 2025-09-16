#!/bin/bash
# Script to deploy directly to Netlify

# Build for Netlify
echo "Building for Netlify..."
GITHUB_PAGES=false npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --dir=dist --prod

echo "Deployment complete!"
