import { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';

const WhatsNew = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  
  // Featured items that will always be shown at the top
  const featuredItems = [
    {
      id: 1,
      title: 'Model availability',
      description: 'New models have been added to the platform. You can now use GPT-4o, Claude 3.5 Sonnet, and more!',
      shortDescription: 'New AI models now available on the platform',
      icon: 'smart_toy',
      tooltip: "Access the latest AI models including GPT-4o, Claude 3.5 Sonnet, and more with improved performance and capabilities.",
      date: new Date('2025-09-09'),
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Iframe embed fixed for Canvas student experience',
      description: 'We have fixed issues with iframe embeds in Canvas, improving the student experience when accessing CreateAI Builder through Canvas LMS.',
      shortDescription: 'Fixed Canvas LMS integration issues',
      icon: 'school',
      tooltip: "We resolved technical issues with iframe embeds in Canvas LMS, ensuring students can seamlessly access all CreateAI Builder features without disruption.",
      date: new Date('2025-09-09'),
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'GPT 5 - available now on CreateAI Builder',
      description: 'GPT-5 is now available on CreateAI Builder! This latest model from OpenAI offers significantly improved reasoning, coding, and creative capabilities.',
      shortDescription: 'Latest GPT-5 model now integrated',
      icon: 'auto_awesome',
      tooltip: "Experience the power of OpenAI's latest GPT-5 model with enhanced reasoning, coding abilities, and creative output capabilities.",
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
        // Remove certain elements like spans with author, time, buttons, and tag-related elements
        return (
          (frame.tag === 'span' && frame.text.includes('atimoh')) ||
          (frame.tag === 'time') ||
          (frame.tag === 'a' && (
            frame.attribs?.class?.includes('btn-tag') || 
            frame.attribs?.class?.includes('tag') ||
            frame.attribs?.href?.includes('/taxonomy/term/')
          )) ||
          frame.tag === 'script' ||
          frame.tag === 'iframe' ||
          // Remove div containers that likely contain tags
          (frame.tag === 'div' && frame.attribs?.class?.includes('field-tags'))
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
    
    // Remove tag-related content with regex patterns
    // This removes div elements with class containing 'field-tags'
    processedContent = processedContent.replace(/<div[^>]*class="[^"]*field-tags[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Remove links that are likely tags
    processedContent = processedContent.replace(/<a[^>]*class="[^"]*btn-tag[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
    processedContent = processedContent.replace(/<a[^>]*class="[^"]*tag[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
    processedContent = processedContent.replace(/<a[^>]*href="[^"]*\/taxonomy\/term\/[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
    
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

  // Format date to a "time ago" string
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHours = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);
      
      if (diffSec < 60) {
        return 'Just now';
      } else if (diffMin < 60) {
        return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      } else if (diffWeeks < 4) {
        return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
      } else if (diffMonths < 12) {
        return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
      } else {
        return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
      }
    } catch (e) {
      return 'Unknown date';
    }
  };
  
  // Format date to a full readable string (for tooltips or when full date is needed)
  const formatFullDate = (dateString) => {
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
  
  // Toggle expanded state for an item
  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-asu-maroon">What's new?</h1>
        <p className="text-gray-600">Latest updates and news about CreateAI Builder</p>
      </div>
      
      {/* Featured Items */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map(item => (
            <div key={item.id} className="bg-white rounded-md shadow-md overflow-hidden">
              <div className="p-6">
                <div className="block items-start mb-4">
                  <div className="text-asu-maroon mr-3">
                    <span className="material-icons text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.shortDescription}</p>
                  </div>
                </div>
                
                <div className="text-gray-700 mb-4 text-sm">
                  <p>{item.tooltip}</p>
                </div>
                
                <div className="flex justify-between items-center text-sm mt-4">
                  <span className="text-gray-500">
                    {formatDate(item.date)}
                  </span>
                  
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
              <div key={index} className="bg-white rounded-md shadow-md overflow-hidden">
                <div className="p-8">
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
                  <div className="items-center gap-2 mb-4">
                    {/* Date Posted */}
                    <span className="block text-gray-500 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatDate(item.pubDate)}
                    </span>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap mt-5">
                      {item.metadata.tags.map((tag, i) => (
                        <a 
                          key={i}
                          href={tag.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-gray-100 text-gray-500 text-xs mr-2 mb-2 px-3 py-1 rounded-full hover:bg-opacity-90 transition-colors"
                        >
                          {tag.text}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  
                  
                  {/* Content */}
                  {expandedItems[`feed-${index}`] && (
                    <div className="text-gray-700 mb-4 rss-content bg-gray-50 p-8 rounded-md">
                      <div dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
                      <p className="text-xs mt-2 text-gray-500">{formatFullDate(item.pubDate)}</p>
                    </div>
                  )}


                  {/* Toggle button for content */}
                  <button 
                    onClick={() => toggleExpanded(`feed-${index}`)} 
                    className="text-asu-maroon hover:underline mb-4 focus:outline-none text-sm"
                  >
                    {expandedItems[`feed-${index}`] ? 'See less' : 'See more'}
                  </button>
                  
                  
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