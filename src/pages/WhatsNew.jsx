import { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';

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

  // Sanitize HTML content but preserve formatting and lists
  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'time'
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'id', 'style'],
        'a': ['href', 'name', 'target', 'rel', 'title'],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        'time': ['datetime', 'title']
      },
      transformTags: {
        // Transform all headings from RSS to appropriate semantic elements
        'h1': function(tagName, attribs) {
          return {
            tagName: 'h2',
            attribs: {
              class: 'text-2xl font-bold mt-4 mb-2 text-asu-maroon'
            }
          };
        },
        'ul': function(tagName, attribs) {
          return {
            tagName: 'ul',
            attribs: {
              class: 'list-disc ml-5 mb-4'
            }
          };
        },
        'ol': function(tagName, attribs) {
          return {
            tagName: 'ol',
            attribs: {
              class: 'list-decimal ml-5 mb-4'
            }
          };
        },
        'li': function(tagName, attribs) {
          return {
            tagName: 'li',
            attribs: {
              class: 'mb-1'
            }
          };
        },
        'p': function(tagName, attribs) {
          return {
            tagName: 'p',
            attribs: {
              class: 'mb-4'
            }
          };
        },
        'a': function(tagName, attribs) {
          return {
            tagName: 'a',
            attribs: {
              ...attribs,
              class: 'text-asu-maroon hover:underline',
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          };
        }
      },
      // Process only the content we want to display and exclude other elements
      exclusiveFilter: function(frame) {
        // Remove certain elements like empty spans
        return (
          (frame.tag === 'span' && !frame.text.trim()) ||
          frame.attribs?.class?.includes('btn-tag') ||
          frame.tag === 'script' ||
          frame.tag === 'iframe'
        );
      }
    });
  };

  const processRssFeedContent = (content) => {
    if (!content) return '';
    
    // Remove any script tags with regex (sanitize-html might miss some)
    let processedContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Extract main content and remove unnecessary elements
    // This would be customized based on the actual feed structure
    const mainContentMatch = processedContent.match(/<h1[^>]*>(.*?)(?:<\/h1>|$)/i);
    if (mainContentMatch) {
      // Start from the h1 element
      const startPos = processedContent.indexOf(mainContentMatch[0]);
      if (startPos > 0) {
        processedContent = processedContent.substring(startPos);
      }
    }
    
    // Sanitize the HTML to ensure it's safe and properly formatted
    return sanitizeContent(processedContent);
  };

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
          contentSnippet: processRssFeedContent(item.querySelector('description')?.textContent) || 'No Description',
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
          <div className="space-y-12">
            {feedItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-asu-maroon">{item.title}</h3>
                  <div className="text-gray-700 mb-4 rss-content">
                    <div dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                  </div>
                  <div className="flex justify-between items-center text-sm border-t pt-4 mt-4 border-gray-200">
                    <span className="text-gray-500">{formatDate(item.pubDate)}</span>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-asu-maroon hover:underline font-medium"
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