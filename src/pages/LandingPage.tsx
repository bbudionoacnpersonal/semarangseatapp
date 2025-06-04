import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { ChevronRight, Check } from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated && user) {
      const dashboardRoute = user.role === 'project_manager' 
        ? '/project-manager/dashboard' 
        : '/resource-lead/dashboard';
      navigate(dashboardRoute);
    }
  }, [isAuthenticated, user, navigate]);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accenture-purple to-purple-900 opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 
            mixBlendMode: 'overlay'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl animate-fade-in">
            <img src="/accenture-logo.svg" alt="Accenture Logo" className="h-16 w-16 mb-8" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Resource Management System
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Streamline your resource allocation, track chargeability, and manage seat assignments with our intelligent platform.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="group"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 md:py-24 bg-accenture-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accenture-gray-900 mb-4">
              Powerful Resource Management Tools
            </h2>
            <p className="text-lg text-accenture-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to efficiently manage resources, track chargeability, and optimize seat allocation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-accenture transform transition duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accenture-purple bg-opacity-10 text-accenture-purple mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-accenture-gray-900 mb-3">Resource Allocation</h3>
              <p className="text-accenture-gray-600">
                Efficiently allocate resources to projects based on skills, availability, and client requirements.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-accenture transform transition duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accenture-purple bg-opacity-10 text-accenture-purple mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-accenture-gray-900 mb-3">Chargeability Tracking</h3>
              <p className="text-accenture-gray-600">
                Monitor resource chargeability and utilization rates with real-time dashboards and analytics.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-accenture transform transition duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accenture-purple bg-opacity-10 text-accenture-purple mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-accenture-gray-900 mb-3">Seat Management</h3>
              <p className="text-accenture-gray-600">
                Optimize office space with intelligent seat assignment and management capabilities.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-accenture transform transition duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accenture-purple bg-opacity-10 text-accenture-purple mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-accenture-gray-900 mb-3">Project Overview</h3>
              <p className="text-accenture-gray-600">
                Get a comprehensive view of all projects, their resource requirements, and allocation status.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-accenture transform transition duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accenture-purple bg-opacity-10 text-accenture-purple mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-accenture-gray-900 mb-3">Role-Based Access</h3>
              <p className="text-accenture-gray-600">
                Tailored interfaces and permissions for Project Managers and Resource Leads.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-accenture transform transition duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accenture-purple bg-opacity-10 text-accenture-purple mb-5">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-accenture-gray-900 mb-3">Analytics & Reports</h3>
              <p className="text-accenture-gray-600">
                Generate detailed reports and insights to optimize resource allocation and chargeability.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 md:py-24 bg-accenture-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to optimize your resource management?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Start using our intelligent platform to streamline resource allocation, track chargeability, and manage seat assignments.
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="group"
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-accenture-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/accenture-logo.svg" alt="Accenture Logo" className="h-8 w-8" />
              <p className="mt-2 text-accenture-gray-400">
                © {new Date().getFullYear()} Accenture. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-accenture-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-accenture-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-accenture-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;