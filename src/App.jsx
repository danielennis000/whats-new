import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import WhatsNew from './pages/WhatsNew';

// Import Material Icons
const materialIconsLink = document.createElement('link');
materialIconsLink.rel = 'stylesheet';
materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
document.head.appendChild(materialIconsLink);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Determine if we're on Netlify or GitHub Pages for the basename
  const isNetlify = import.meta.env.NETLIFY === 'true' || window.location.hostname.includes('netlify.app');
  const basename = isNetlify ? '/' : '/whats-new';
  
  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="whats-new" element={<WhatsNew />} />
          <Route path="templates" element={<div className="p-8"><h1 className="text-3xl font-bold mb-4">Templates</h1><p>Templates page placeholder</p></div>} />
          <Route path="projects" element={<div className="p-8"><h1 className="text-3xl font-bold mb-4">Projects</h1><p>Projects page placeholder</p></div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;