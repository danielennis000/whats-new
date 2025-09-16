import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-50 text-gray-800 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-white/20">
        <h1 className="text-xl font-bold">CreateAI Builder</h1>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-md ${isActive ? 'bg-gray-400/30' : 'hover:bg-gray-400/30'}`
              }
            >
              <span className="material-icons mr-3">dashboard</span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/whats-new" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-md ${isActive ? 'bg-gray-400/30' : 'hover:bg-gray-400/30'}`
              }
            >
              <span className="material-icons mr-3">new_releases</span>
              What's New
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/templates" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-md ${isActive ? 'bg-gray-400/30' : 'hover:bg-gray-400/30'}`
              }
            >
              <span className="material-icons mr-3">category</span>
              Templates
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-md ${isActive ? 'bg-gray-400/30' : 'hover:bg-gray-400/30'}`
              }
            >
              <span className="material-icons mr-3">folder</span>
              Projects
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/20">
        <button 
          className="flex items-center p-3 w-full rounded-md hover:bg-gray-100"
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.reload();
          }}
        >
          <span className="material-icons mr-3">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
