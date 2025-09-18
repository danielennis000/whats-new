import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userName, setUserName] = useState('Daniel');
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    // Determine time of day for greeting
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
    
    // In a real app, you would fetch the user's name from auth/profile service
    // For now we'll use the hardcoded name
  }, []);

  // Featured update content
  const featuredUpdate = {
    preHeader: "What's new",
    title: "Model availability: New AI models now available on the platform",
    description: "Experience the power of OpenAI's latest GPT-5 model with enhanced reasoning, coding abilities, and creative output capabilities.",
    icon: "smart_toy",
    date: "2 days ago"
  };

  // Template items
  const templates = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: `Template ${index + 1}`,
    description: `Description for template ${index + 1}`,
    icon: ["edit_document", "model_training", "code", "integration_instructions"][index % 4]
  }));

  // Getting started guides
  const guides = [
    { id: 1, title: 'Getting Started with CreateAI', icon: 'school' },
    { id: 2, title: 'Building Your First AI Model', icon: 'rocket_launch' },
    { id: 3, title: 'Advanced Prompt Engineering', icon: 'psychology' }
  ];

  // Recent projects
  const recentProjects = [
    { id: 1, title: 'Chat Interface Project', lastEdited: '2 hours ago' },
    { id: 2, title: 'Content Generator', lastEdited: '1 day ago' },
    { id: 3, title: 'Sentiment Analysis Tool', lastEdited: '3 days ago' }
  ];

  // Shared projects
  const sharedProjects = [
    { id: 1, title: 'Team Collaboration Project', sharedBy: 'Alex Kim' },
    { id: 2, title: 'Customer Support Bot', sharedBy: 'Jamie Smith' },
    { id: 3, title: 'Data Analysis Dashboard', sharedBy: 'Morgan Taylor' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Personalized Greeting */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Hello there, {userName}.
        </h1>
        <p className="text-xl text-gray-600">
          Good {timeOfDay}! Welcome to your CreateAI Builder dashboard.
        </p>
      </div>
      
      {/* Featured Update - Hero Section */}
      <div className="mb-12 bg-white rounded-md shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Content */}
          <div className="p-8 md:w-1/2">
            <div className="flex items-center mb-4">
              <div className="bg-brand-3 text-brand-1 p-3 rounded-full mr-4">
                <span className="material-icons text-3xl">{featuredUpdate.icon}</span>
              </div>
              <p className="text-sm uppercase tracking-wider font-semibold text-brand-1">
                {featuredUpdate.preHeader}
              </p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {featuredUpdate.title}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {featuredUpdate.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{featuredUpdate.date}</span>
              <Link 
                to="/whats-new" 
                className="px-6 py-2 bg-asu-maroon text-white font-medium rounded-full hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
              >
                See all updates
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center">
            <div className="p-8 w-full h-full flex items-center justify-center">
              <div className="relative w-full h-64 md:h-full">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="material-icons text-gray-400 text-6xl">image</span>
                </div>
                {/* Placeholder for actual image */}
                {/* <img 
                  src="/path-to-image.jpg" 
                  alt="Featured update illustration" 
                  className="object-cover w-full h-full"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Templates Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Templates</h2>
          <Link to="/templates" className="text-brand-1 hover:underline font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {templates.map(template => (
            <div key={template.id} className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-all">
              <div className="text-brand-1 mb-2">
                <span className="material-icons text-2xl">{template.icon}</span>
              </div>
              <h3 className="font-bold mb-1">{template.name}</h3>
              <p className="text-gray-600 text-sm">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Getting Started Guides */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Getting Started Guides</h2>
          <Link to="/guides" className="text-brand-1 hover:underline font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map(guide => (
            <div key={guide.id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-all">
              <span className="material-icons text-3xl text-brand-4 mb-3">{guide.icon}</span>
              <h3 className="font-bold text-lg mb-2">{guide.title}</h3>
              <p className="text-gray-600 text-sm">Learn the essential steps to get started</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Projects */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Projects</h2>
          <Link to="/projects" className="text-brand-1 hover:underline font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProjects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-500 text-sm">Last edited: {project.lastEdited}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Shared Projects */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Shared Projects</h2>
          <Link to="/shared" className="text-brand-1 hover:underline font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sharedProjects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-all">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-gray-500 text-sm">Shared by: {project.sharedBy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;