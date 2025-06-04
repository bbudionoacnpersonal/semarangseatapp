import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProjectManagerDashboard from './pages/ProjectManagerDashboard';
import ResourceLeadDashboard from './pages/ResourceLeadDashboard';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  const { user } = useAuthStore();
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/project-manager/*" 
        element={
          <ProtectedRoute requiredRole="project_manager">
            <Layout>
              <ProjectManagerDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/resource-lead/*" 
        element={
          <ProtectedRoute requiredRole="resource_lead">
            <Layout>
              <ResourceLeadDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;