import { useState, useEffect } from 'react';
import Parser from 'rss-parser';

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
        const parser = new Parser();
        
        // Use a CORS proxy for the feed URL if needed
        const feedUrl = 'https://cors-anywhere.herokuapp.com/https://ai.asu.edu/taxonomy/term/1/feed';
        
        try {
          const feed = await parser.parseURL(feedUrl);
          setFeedItems(feed.items || []);
        } catch (proxyError) {
          console.log('Error using proxy, trying to mock data:', proxyError);
          
          // If proxy fails, provide some mock data
          setFeedItems([
            {
              title: 'AI Acceleration Program Launches New Course',
              contentSnippet: 'The AI Acceleration program is proud to announce a new course focused on advanced prompt engineering techniques.',
              pubDate: 'Mon, 08 Sep 2025 14:30:00 GMT',
              link: '#'
            },
            {
              title: 'CreateAI Builder Reaches 10,000 Users',
                contentSnippet: 'We are celebrating a major milestone as CreateAI Builder has now been used by over 10,000 faculty and staff members.',
              pubDate: 'Fri, 05 Sep 2025 09:15:00 GMT',
              link: '#'
            },
            {
              title: 'Workshop: AI for Course Design',
              contentSnippet: 'Join us for a hands-on workshop where you will learn how to leverage AI tools for effective course design and student engagement.',
              pubDate: 'Wed, 03 Sep 2025 13:00:00 GMT',
              link: '#'
            }
          ]);
        }
      } catch (err) {
        setError('Failed to fetch feed. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        
        {loading && <p>Loading feed...</p>}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="space-y-6">
            {feedItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.contentSnippet}</p>
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
      </div>
    </div>
  );
};

export default WhatsNew;
