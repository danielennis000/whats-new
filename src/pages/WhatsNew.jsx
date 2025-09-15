import { useState, useEffect } from 'react';

const WhatsNew = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Featured items that will always be shown at the top
  const featuredItems = [
    {
      id: 1,
      title: 'Model availability',
      description: 'New models have been added to the platform. You can now use GPT-4o, Claude 3.5 Sonnet, and more!',
      date: new Date('2025-09-09'),
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Iframe embed fixed for Canvas student experience',
      description: 'We have fixed issues with iframe embeds in Canvas, improving the student experience when accessing CreateAI Builder through Canvas LMS.',
      date: new Date('2025-09-09'),
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'GPT 5 - available now on CreateAI Builder',
      description: 'GPT-5 is now available on CreateAI Builder! This latest model from OpenAI offers significantly improved reasoning, coding, and creative capabilities.',
      date: new Date('2025-09-09'),
      link: '#',
      featured: true
    }
  ];

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        // Use a relative URL that will be proxied by Vite
        const response = await fetch('/api/rss-feed');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'application/xml');
        
        if (xml.querySelector('parsererror')) {
          throw new Error('XML parsing error');
        }
        
        const items = Array.from(xml.querySelectorAll('item')).map(item => ({
          title: item.querySelector('title')?.textContent || 'No Title',
          link: item.querySelector('link')?.textContent || '#',
          contentSnippet: item.querySelector('description')?.textContent || 'No Description',
          pubDate: item.querySelector('pubDate')?.textContent || new Date().toUTCString(),
        }));
        
        setFeedItems(items);
        setError(null);
      } catch (err) {
        console.error('Error fetching RSS feed:', err);
        setError('Failed to fetch RSS feed. Please try again later.');
        setFeedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  // Format date to a readable string
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-asu-maroon">What's New</h1>
        <p className="text-gray-600">Latest updates and news about CreateAI Builder</p>
      </div>
      
      {/* Featured Items */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-1 h-5 bg-asu-maroon mr-3 flex-shrink-0"></div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{formatDate(item.date)}</span>
                  <a href={item.link} className="text-asu-maroon hover:underline">Read more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* RSS Feed Items */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Updates</h2>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-asu-maroon"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
            <p className="mt-2 text-sm">
              This prototype requires a server to proxy the RSS feed request due to CORS restrictions.
            </p>
          </div>
        )}
        
        {!loading && !error && feedItems.length > 0 && (
          <div className="space-y-6">
            {feedItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <div 
                    className="text-gray-600 mb-4"
                    dangerouslySetInnerHTML={{ __html: item.contentSnippet }}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{formatDate(item.pubDate)}</span>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-asu-maroon hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && feedItems.length === 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p>No RSS feed items found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsNew;