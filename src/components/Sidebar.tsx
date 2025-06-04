import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase,
  BarChart3, 
  Calendar,
  Settings,
  MapPin,
  HelpCircle,
  Landmark
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user } = useAuthStore();
  const isProjectManager = user?.role === 'project_manager';
  const isResourceLead = user?.role === 'resource_lead';

  const baseUrl = isProjectManager ? '/project-manager' : '/resource-lead';
  
  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed inset-y-0 left-0 transform md:relative z-30 transition duration-300 ease-in-out w-64 bg-white border-r border-gray-200 overflow-y-auto`}>
      <div className="p-4">
        <div className="mt-6">
          <nav className="space-y-1">
            <NavLink
              to={`${baseUrl}/dashboard`}
              className={({ isActive }) => 
                `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                  isActive 
                    ? 'text-accenture-purple bg-purple-50' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>
            
            {isProjectManager && (
              <>
                <NavLink
                  to={`${baseUrl}/projects`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  Projects
                </NavLink>
                <NavLink
                  to={`${baseUrl}/resources`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Users className="mr-3 h-5 w-5" />
                  Resources
                </NavLink>
                <NavLink
                  to={`${baseUrl}/assignments`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Assignments
                </NavLink>
              </>
            )}
            
            {isResourceLead && (
              <>
                <NavLink
                  to={`${baseUrl}/resources`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Users className="mr-3 h-5 w-5" />
                  All Resources
                </NavLink>
                <NavLink
                  to={`${baseUrl}/projects`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Briefcase className="mr-3 h-5 w-5" />
                  Projects Overview
                </NavLink>
                <NavLink
                  to={`${baseUrl}/seats`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <MapPin className="mr-3 h-5 w-5" />
                  Seat Management
                </NavLink>
                <NavLink
                  to={`${baseUrl}/chargeability`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Chargeability
                </NavLink>
                <NavLink
                  to={`${baseUrl}/finance`}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                      isActive 
                        ? 'text-accenture-purple bg-purple-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Landmark className="mr-3 h-5 w-5" />
                  Finance
                </NavLink>
              </>
            )}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <NavLink
                to={`${baseUrl}/settings`}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                    isActive 
                      ? 'text-accenture-purple bg-purple-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </NavLink>
              <NavLink
                to={`${baseUrl}/help`}
                className={({ isActive }) => 
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all ${
                    isActive 
                      ? 'text-accenture-purple bg-purple-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;