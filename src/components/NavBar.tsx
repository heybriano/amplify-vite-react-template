// src/components/NavBar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Clipboard, Bell, Settings } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold">Case Management</span>
            </Link>

            <div className="flex space-x-4">
              <Link 
                to="/" 
                className={`flex items-center px-3 py-2 ${isActive('/')}`}
              >
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </Link>

              <Link 
                to="/follow-ups" 
                className={`flex items-center px-3 py-2 ${isActive('/follow-ups')}`}
              >
                <Bell className="h-5 w-5 mr-2" />
                Follow-ups
              </Link>

              <Link 
                to="/cases" 
                className={`flex items-center px-3 py-2 ${isActive('/cases')}`}
              >
                <Clipboard className="h-5 w-5 mr-2" />
                Cases
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Link 
              to="/settings" 
              className={`flex items-center px-3 py-2 ${isActive('/settings')}`}
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;