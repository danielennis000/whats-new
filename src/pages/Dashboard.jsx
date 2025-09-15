import WhatsNewSection from '../components/WhatsNewSection';

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-asu-maroon">Dashboard</h1>
        <p className="text-gray-600">Welcome to CreateAI Builder</p>
      </div>
      
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Welcome to CreateAI Builder - built by ASU, for ASU</h2>
            <p className="text-gray-600 mb-6">Chat with CreateAI GuideBot or start with a template, and see what you can build today</p>
            
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              <textarea 
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-asu-maroon" 
                rows="2"
                placeholder="Message preview..."
              ></textarea>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white border border-gray-300 rounded-md px-6 py-4">
                <p className="text-sm">Understand what I can do with CreateAI Builder</p>
              </div>
              <div className="bg-white border border-gray-300 rounded-md px-6 py-4">
                <p className="text-sm">Plan out my next course curriculum</p>
              </div>
              <div className="bg-white border border-gray-300 rounded-md px-6 py-4">
                <p className="text-sm">Give me a good example of a system prompt</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="bg-asu-maroon text-white p-8 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Templates Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-4 p-3 bg-asu-maroon rounded-md text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Start with a template</h2>
            <p className="text-gray-600">Looking for inspiration? Select a template and see what AI can do.</p>
          </div>
        </div>
      </div>
      
      {/* What's New Section */}
      <WhatsNewSection />
    </div>
  );
};

export default Dashboard;
