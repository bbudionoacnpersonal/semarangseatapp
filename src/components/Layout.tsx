import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Sidebar from './Sidebar';
import { Menu, X, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b border-accenture-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <button 
            type="button" 
            className="text-accenture-gray-500 hover:text-accenture-gray-700 focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="ml-4 md:ml-0 flex items-center">
            <img src="/accenture-logo.svg" alt="Accenture Logo" className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold">Accenture SEmarang Resources</span>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-sm hidden md:block">
              <p className="text-accenture-gray-700 font-medium">{user.name}</p>
              <p className="text-accenture-gray-500">{user.role === 'project_manager' ? 'Project Manager' : 'Resource Lead'}</p>
            </div>
            <div className="relative">
              <img 
                src={user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=A100FF&color=fff`} 
                alt={`${user.name}'s avatar`}
                className="h-10 w-10 rounded-full border-2 border-accenture-purple"
              />
            </div>
            <button 
              onClick={handleLogout} 
              className="p-1.5 rounded-full text-accenture-gray-600 hover:bg-accenture-gray-100 focus:outline-none"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-accenture-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;