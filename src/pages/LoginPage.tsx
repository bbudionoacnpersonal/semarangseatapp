import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { AlertCircle } from 'lucide-react';

interface LocationState {
  from?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // For demo purposes, suggest login credentials
  const [showHint, setShowHint] = useState(true);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
      const user = useAuthStore.getState().user;
      
      // Redirect based on user role
      if (user) {
        const dashboardPath = user.role === 'project_manager' 
          ? '/project-manager/dashboard' 
          : '/resource-lead/dashboard';
        navigate(dashboardPath);
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleDemoLogin = (role: 'project_manager' | 'resource_lead') => {
    if (role === 'project_manager') {
      setEmail('john.smith@accenture.com');
      setPassword('manager123');
    } else {
      setEmail('sarah.johnson@accenture.com');
      setPassword('resource123');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-accenture-purple to-purple-900">
      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="flex justify-center mb-8">
                <img src="/accenture-logo.svg" alt="Accenture Logo" className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Sign in to your account
              </h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-6 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              {showHint && (
                <div className="bg-accenture-gray-50 border border-accenture-gray-200 rounded-md p-3 mb-6">
                  <p className="text-sm text-accenture-gray-700 mb-2">
                    <strong>Demo Credentials:</strong>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <button 
                      onClick={() => handleDemoLogin('project_manager')}
                      className="text-left text-accenture-purple hover:underline"
                    >
                      <span className="font-medium">Project Manager:</span>
                      <div className="text-accenture-gray-600 text-xs">john.smith@accenture.com</div>
                      <div className="text-accenture-gray-600 text-xs">manager123</div>
                    </button>
                    <button 
                      onClick={() => handleDemoLogin('resource_lead')}
                      className="text-left text-accenture-purple hover:underline"
                    >
                      <span className="font-medium">Resource Lead:</span>
                      <div className="text-accenture-gray-600 text-xs">sarah.johnson@accenture.com</div>
                      <div className="text-accenture-gray-600 text-xs">resource123</div>
                    </button>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@accenture.com"
                    className="input w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="input w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="py-4 text-center text-white/75 text-sm">
        © {new Date().getFullYear()} Accenture. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;