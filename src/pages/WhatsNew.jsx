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

  // Extracts metadata from HTML content
  const extractMetadata = (html) => {
    if (!html) return { author: null, dates: [], tags: [] };
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract author
    const authorElement = tempDiv.querySelector('span span');
    const author = authorElement?.textContent || null;

    // Extract dates
    const timeElements = Array.from(tempDiv.querySelectorAll('time'));
    const dates = timeElements.map(el => ({
      datetime: el.getAttribute('datetime'),
      text: el.textContent.trim(),
      title: el.getAttribute('title') || ''
    }));

    // Extract tags from buttons
    const tagElements = Array.from(tempDiv.querySelectorAll('a.btn-tag, a.btn-tag-alt-white'));
    const tags = tagElements.map(el => ({
      text: el.textContent.trim(),
      link: el.getAttribute('href') || '#'
    }));

    return { author, dates, tags };
  };

  // Sanitize HTML content but preserve formatting and lists
  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'id', 'style'],
        'a': ['href', 'name', 'target', 'rel', 'title'],
        'img': ['src', 'alt', 'title', 'width', 'height']
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
        // Remove certain elements like spans with author, time, and buttons
        return (
          (frame.tag === 'span' && frame.text.includes('atimoh')) ||
          (frame.tag === 'time') ||
          frame.attribs?.class?.includes('btn-tag') ||
          frame.tag === 'script' ||
          frame.tag === 'iframe'
        );
      }
    });
  };

  const processRssFeedContent = (content) => {
    if (!content) return { cleanContent: '', metadata: { author: null, dates: [], tags: [] }};
    
    // Remove any script tags with regex (sanitize-html might miss some)
    let processedContent = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Extract metadata before sanitizing
    const metadata = extractMetadata(processedContent);
    
    // Check if content contains an H1 with same title, if so remove the duplicate title
    const titleRegex = /<h1[^>]*>([\s\S]*?)<\/h1>/i;
    const titleMatch = processedContent.match(titleRegex);
    if (titleMatch) {
      // Remove the entire H1 element
      processedContent = processedContent.replace(titleMatch[0], '');
    }

    // Sanitize the HTML to ensure it's safe and properly formatted
    const cleanContent = sanitizeContent(processedContent);
    
    return { cleanContent, metadata };
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
        
        const items = Array.from(xml.querySelectorAll('item')).map(item => {
          const title = item.querySelector('title')?.textContent || 'No Title';
          const link = item.querySelector('link')?.textContent || '#';
          const pubDate = item.querySelector('pubDate')?.textContent || new Date().toUTCString();
          
          // Process the content
          const { cleanContent, metadata } = processRssFeedContent(
            item.querySelector('description')?.textContent
          );
          
          return {
            title,
            link,
            contentSnippet: cleanContent,
            pubDate,
            metadata
          };
        });
        
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
                  {/* Title */}
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mb-2"
                  >
                    <h3 className="font-bold text-xl text-asu-maroon hover:underline">{item.title}</h3>
                  </a>
                  
                  {/* Metadata Tags Row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Author */}
                    {item.metadata.author && (
                      <span className="inline-block bg-brand-5 text-brand-4 text-xs px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {item.metadata.author}
                      </span>
                    )}
                    
                    {/* Date Posted */}
                    {item.metadata.dates.length > 0 && (
                      <span className="inline-block bg-brand-3 text-brand-1 text-xs px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {item.metadata.dates[0]?.text || formatDate(item.pubDate)}
                      </span>
                    )}
                    
                    {/* Tags */}
                    {item.metadata.tags.map((tag, i) => (
                      <a 
                        key={i}
                        href={tag.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-asu-maroon text-white text-xs px-3 py-1 rounded-full hover:bg-opacity-90 transition-colors"
                      >
                        {tag.text}
                      </a>
                    ))}
                  </div>
                  
                  {/* Content */}
                  <div className="text-gray-700 mb-4 rss-content">
                    <div dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                  </div>
                  
                  {/* Footer */}
                  <div className="flex justify-end items-center mt-4 border-t pt-4 border-gray-200">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-asu-maroon hover:underline font-medium"
                    >
                      Read full article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
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