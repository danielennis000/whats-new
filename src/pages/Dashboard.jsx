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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-all flex flex-col h-full">
              <div className={`${template.iconColor} mb-3`}>
                <span className="material-icons text-2xl">{template.icon}</span>
              </div>
              <h3 className="font-bold mb-2 text-lg">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{template.description}</p>
              <Link to="/templates" className="text-asu-maroon hover:underline font-medium text-sm">
                {template.buttonText}
              </Link>
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