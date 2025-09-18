import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SidebarChat from './SidebarChat';

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex min-h-screen bg-light-white">
      <Sidebar />
      
      <main className={`ml-64 flex-1 p-8 transition-all duration-300 ${isChatOpen ? 'mr-[320px]' : 'mr-0'}`}>
        <Outlet />
      </main>
      
      <SidebarChat isOpen={isChatOpen} toggleSidebar={toggleChat} />
    </div>
  );
};

export default Layout;
