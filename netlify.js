// This file helps integrate GitHub Pages with Netlify functions
// It redirects API calls from GitHub Pages to Netlify functions

// Check if we're running on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Netlify site URL
const NETLIFY_URL = 'https://tubular-alfajores-8ec8b8.netlify.app';

// Function to intercept fetch calls and redirect API calls to Netlify
if (isGitHubPages) {
  const originalFetch = window.fetch;
  
  window.fetch = function (url, options) {
    // If this is an API call
    if (typeof url === 'string' && url.startsWith('/api/')) {
      // Redirect to Netlify
      const netlifyUrl = `${NETLIFY_URL}${url}`;
      return originalFetch(netlifyUrl, options);
    }
    
    // Otherwise proceed normally
    return originalFetch(url, options);
  };
  
  console.log('Netlify integration enabled for GitHub Pages');
}

export default {};
