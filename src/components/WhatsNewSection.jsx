import { Link } from 'react-router-dom';

const WhatsNewSection = () => {
  // Sample news items - in a real app, these would come from an API or CMS
  const newsItems = [
    {
      id: 1,
      title: 'Model availability',
      shortDescription: 'New AI models now available on the platform',
      icon: 'smart_toy',
      tooltip: 'Access the latest AI models including GPT-4o, Claude 3.5 Sonnet, and more with improved performance and capabilities.',
      editedDays: 6
    },
    {
      id: 2,
      title: 'Iframe embed fixed for Canvas student experience',
      shortDescription: 'Fixed Canvas LMS integration issues',
      icon: 'school',
      tooltip: "We resolved technical issues with iframe embeds in Canvas LMS, ensuring students can seamlessly access all CreateAI Builder features without disruption.",
      editedDays: 6
    },
    {
      id: 3,
      title: 'GPT 5 - available now on CreateAI Builder',
      shortDescription: 'Latest GPT-5 model now integrated',
      icon: 'auto_awesome',
      tooltip: "Experience the power of OpenAI's latest GPT-5 model with enhanced reasoning, coding abilities, and creative output capabilities.",
      editedDays: 6
    }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-start">
          <div className="mr-4 p-3 bg-asu-maroon rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">What's new?</h2>
            <p className="text-gray-600">Take a look at some of the recent updates to CreateAI Builder</p>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search your project"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-asu-maroon"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {newsItems.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-md shadow-md w-64 min-w-64">
            <div className="block items-start mb-3">
              <div className="block text-asu-maroon mr-3">
                <span className="material-icons text-2xl">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.shortDescription}</p>
              </div>
            </div>
            <div className="text-gray-700 text-sm mb-3">
              <p>{item.tooltip}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Edited {item.editedDays} day(s) ago</span>
            </div>
          </div>
        ))}
        
        <div className="bg-white p-4 rounded-md shadow-md w-64 min-w-64 flex items-center justify-center">
          <Link to="/whats-new" className="text-asu-maroon hover:underline font-medium">
            See all updates
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhatsNewSection;
