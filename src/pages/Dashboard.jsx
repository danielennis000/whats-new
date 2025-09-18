import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userName, setUserName] = useState('Daniel');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

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
  const templates = [
    {
      id: 1,
      name: "Classroom and Curriculum Design",
      description: "This template can be tailored to your individual course structure, material, and lesson plans to help create engaging learning experiences",
      icon: "school",
      iconColor: "text-asu-maroon",
      buttonText: "Use this Template"
    },
    {
      id: 2,
      name: "Learning Objectives and Lesson Planning",
      description: "Define custom learning objectives, goals, or structured lessons that align with ASU educational standards",
      icon: "menu_book",
      iconColor: "text-orange-500",
      buttonText: "Use this Template"
    },
    {
      id: 3,
      name: "Syllabot",
      description: "Add your course syllabus to this Syllabot Template to allow users to interact with your syllabus content using AI",
      icon: "build",
      iconColor: "text-blue-500",
      buttonText: "Use this Template"
    },
    {
      id: 4,
      name: "Accessibility and Customer Support",
      description: "Upload custom knowledge base and system instructions to make an AI project to answer frequently answered questions in your department",
      icon: "accessibility",
      iconColor: "text-yellow-500",
      buttonText: "Use this Template"
    },
    {
      id: 5,
      name: "Idea Generation and Planning",
      description: "Let AI guide your planning and brainstorming process with Design Thinking that can conform to any project idea",
      icon: "lightbulb",
      iconColor: "text-blue-500",
      buttonText: "Use this Template"
    },
    {
      id: 6,
      name: "Data Analysis and Insights",
      description: "Engage with a fine-tuned Data Analysis & Insights template to convert programming language, write SQL, or ask about sentiment analysis",
      icon: "insights",
      iconColor: "text-orange-500",
      buttonText: "Use this Template"
    },
    {
      id: 7,
      name: "Presentation and Reporting",
      description: "Use this template to structure your reports and presentations and tell a clear, impactful story with your insights",
      icon: "bar_chart",
      iconColor: "text-asu-maroon",
      buttonText: "Use this Template"
    },
    {
      id: 8,
      name: "Instructional Design and Training Simulations",
      description: "Use this to create training programs, interactive learning modules and more based on your target audience, goals and content",
      icon: "school",
      iconColor: "text-asu-maroon",
      buttonText: "Use this Template"
    },
    {
      id: 9,
      name: "Content Creation and Report Writing",
      description: "Aids in drafting, editing and refining written content for reports, communication and creative projects",
      icon: "edit_note",
      iconColor: "text-asu-maroon",
      buttonText: "Use this Template"
    },
    {
      id: 10,
      name: "Research Support",
      description: "This template will help you plan your research process, starting from literature review to organizing your research output",
      icon: "science",
      iconColor: "text-orange-500",
      buttonText: "Use this Template"
    },
    {
      id: 11,
      name: "Friendly AI Explainer",
      description: "Learn to use CreateAI Builder: RAG, Context, LLM, Agents; prompt engineering strategies; evals; hallucination; different models strengths and weaknesses; speed; tokens; and more",
      icon: "psychology",
      iconColor: "text-orange-500",
      buttonText: "Use this Template"
    },
    {
      id: 12,
      name: "Job Search Prompt",
      description: "AI Resume Writing Assistant",
      icon: "description",
      iconColor: "text-yellow-500",
      buttonText: "Use this Template"
    },
    {
      id: 13,
      name: "New AI project",
      description: "Start a new AI project with empty fields",
      icon: "add_circle",
      iconColor: "text-orange-500",
      buttonText: "Create New Project"
    }
  ];

  // Getting started guides
  const guides = [
    { id: 1, title: 'Getting Started with CreateAI', icon: 'school' },
    { id: 2, title: 'Building Your First AI Model', icon: 'rocket_launch' },
    { id: 3, title: 'Advanced Prompt Engineering', icon: 'psychology' }
  ];

  // Recent projects
  const recentProjects = [
    { 
      id: 1, 
      title: 'Chat Interface Project', 
      description: 'A responsive chat UI with real-time message delivery and typing indicators.', 
      owner: 'You', 
      ownerImage: 'https://ui-avatars.com/api/?name=You&background=random',
      lastEdited: '2 hours ago' 
    },
    { 
      id: 2, 
      title: 'Content Generator', 
      description: 'AI-powered tool that creates engaging blog posts and social media content.', 
      owner: 'You', 
      ownerImage: 'https://ui-avatars.com/api/?name=You&background=random',
      lastEdited: '1 day ago' 
    },
    { 
      id: 3, 
      title: 'Sentiment Analysis Tool', 
      description: 'Analyzes customer feedback and categorizes sentiment with 92% accuracy.', 
      owner: 'You', 
      ownerImage: 'https://ui-avatars.com/api/?name=You&background=random',
      lastEdited: '3 days ago' 
    }
  ];

  // Shared projects
  const sharedProjects = [
    { 
      id: 1, 
      title: 'Team Collaboration Project', 
      description: 'A shared workspace for the marketing team to collaborate on campaign assets.', 
      sharedBy: 'Alex Kim', 
      ownerImage: 'https://ui-avatars.com/api/?name=Alex+Kim&background=random',
      lastEdited: '5 hours ago' 
    },
    { 
      id: 2, 
      title: 'Customer Support Bot', 
      description: 'Automated support assistant that handles common customer inquiries.', 
      sharedBy: 'Jamie Smith', 
      ownerImage: 'https://ui-avatars.com/api/?name=Jamie+Smith&background=random',
      lastEdited: '2 days ago' 
    },
    { 
      id: 3, 
      title: 'Data Analysis Dashboard', 
      description: 'Interactive visualization of quarterly sales and customer engagement metrics.', 
      sharedBy: 'Morgan Taylor', 
      ownerImage: 'https://ui-avatars.com/api/?name=Morgan+Taylor&background=random',
      lastEdited: '1 week ago' 
    }
  ];
  
  // Filter templates based on search query
  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle carousel navigation
  const nextSlide = () => {
    setCarouselIndex((prevIndex) => {
      // Calculate the next index, ensuring we don't go beyond the available templates
      const nextIndex = prevIndex + 1;
      return nextIndex >= Math.ceil(filteredTemplates.length / 3) ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCarouselIndex((prevIndex) => {
      // Calculate the previous index, ensuring we don't go below 0
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? Math.ceil(filteredTemplates.length / 3) - 1 : newIndex;
    });
  };

  // Handle template selection for modal
  const openTemplateModal = (template) => {
    setSelectedTemplate(template);
    setNewProjectTitle(`New ${template.name}`);
    setNewProjectDescription('');
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTemplate(null);
    setNewProjectTitle('');
    setNewProjectDescription('');
  };

  // Handle creation of new project from template
  const createFromTemplate = () => {
    // In a real app, this would make an API call to create a new project
    console.log('Creating new project:', {
      templateId: selectedTemplate.id,
      title: newProjectTitle,
      description: newProjectDescription
    });
    
    // Close the modal
    closeModal();
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Template Detail Modal */}
      {showModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`${selectedTemplate.iconColor} p-2 rounded-md`}>
                    <span className="material-icons text-2xl">{selectedTemplate.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedTemplate.name}</h2>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-2">About this template</h3>
                <p className="text-gray-700">{selectedTemplate.description}</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-asu-maroon"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Enter project title"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Project Description (optional)
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-asu-maroon min-h-[100px]"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Enter project description"
                ></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex gap-3">
                <Link
                  to={`/templates/${selectedTemplate.id}`}
                  className="px-4 py-2 border border-asu-maroon text-asu-maroon rounded-md hover:bg-asu-maroon/5 transition-colors"
                >
                  View Template Details
                </Link>
                <button
                  onClick={createFromTemplate}
                  disabled={!newProjectTitle.trim()}
                  className={`px-4 py-2 bg-asu-maroon text-white rounded-md transition-all transform hover:-translate-y-0.5 hover:shadow-md ${!newProjectTitle.trim() ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
              
              <p className="text-sm uppercase tracking-wider font-semibold text-gray-400">
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

          {/* Right Column - Video */}
          <div className="md:w-1/2 flex items-center justify-center p-0">
            <div className="w-full h-full flex items-center justify-center p-0">
              <div className="w-full h-full overflow-hidden">
                <video 
                  src="https://cdn.openai.com/ctf-cdn/20250805_GPT-5_ArtCard_1920x1080_16x9_DZ_v20.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
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
        
        {/* Search bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-asu-maroon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            search
          </span>
        </div>
        
        {/* Templates carousel */}
        <div className="relative">
          {/* Carousel navigation */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 z-10">
            <button 
              onClick={prevSlide}
              className="bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-all"
              aria-label="Previous templates"
            >
              <span className="material-icons" style={{ margin: '5px' }}>arrow_back</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTemplates.length > 0 ? (
              filteredTemplates
                .slice(carouselIndex * 3, carouselIndex * 3 + 3)
                .map(template => (
                  <div key={template.id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-all flex flex-col h-full">
                    <div className={`${template.iconColor} mb-3`}>
                      <span className="material-icons text-2xl">{template.icon}</span>
                    </div>
                    <h3 className="font-bold mb-2 text-lg">{template.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{template.description}</p>
                    <button 
                      onClick={() => openTemplateModal(template)}
                      className="text-asu-maroon hover:underline font-medium text-sm text-left"
                    >
                      {template.buttonText}
                    </button>
                  </div>
                ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <p className="text-gray-500">No templates matching your search criteria</p>
              </div>
            )}
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 z-10">
            <button 
              onClick={nextSlide}
              className="bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-all"
              aria-label="Next templates"
            >
              <span className="material-icons" style={{ margin: '5px' }}>arrow_forward</span>
            </button>
          </div>
          
          {/* Carousel indicators */}
          {filteredTemplates.length > 3 && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredTemplates.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 h-2 w-2 rounded-full ${index === carouselIndex ? 'bg-asu-maroon' : 'bg-gray-300'}`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Go to template set ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
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
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <img
                  src={project.ownerImage}
                  alt={project.owner}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <p className="text-gray-700 text-sm mb-4">{project.description}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-1 text-sm">person</span>
                  <span className="text-gray-600">{project.owner}</span>
                </div>
                <div className="text-gray-500">
                  <span className="material-icons text-gray-400 mr-1 text-sm">schedule</span>
                  {project.lastEdited}
                </div>
              </div>
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
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <img
                  src={project.ownerImage}
                  alt={project.sharedBy}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <p className="text-gray-700 text-sm mb-4">{project.description}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-1 text-sm">person_add</span>
                  <span className="text-gray-600">Shared by: {project.sharedBy}</span>
                </div>
                <div className="text-gray-500">
                  <span className="material-icons text-gray-400 mr-1 text-sm">schedule</span>
                  {project.lastEdited}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;