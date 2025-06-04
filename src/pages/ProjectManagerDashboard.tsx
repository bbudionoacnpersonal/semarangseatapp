import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useResourceStore } from '../stores/resourceStore';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Users, Briefcase, AlertCircle, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Import other sub-pages (will be created later)
import ProjectManagerProjectsPage from './projectManager/ProjectsPage';
import ProjectManagerResourcesPage from './projectManager/ResourcesPage';
import ProjectManagerAssignmentsPage from './projectManager/AssignmentsPage';

// Dashboard overview component
const DashboardOverview = () => {
  const { resources, projects, fetchResources, fetchProjects, isLoading } = useResourceStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchResources();
    fetchProjects();
  }, [fetchResources, fetchProjects]);

  // Calculate metrics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalResources = resources.length;
  const assignedResources = resources.filter(r => r.projectId !== null).length;
  const avgChargeability = resources.length > 0
    ? Math.round(resources.reduce((sum, r) => sum + r.chargeability, 0) / resources.length)
    : 0;
  
  // Find upcoming project deadlines
  const upcomingDeadlines = projects
    .filter(p => p.endDate !== null && p.status === 'active')
    .sort((a, b) => {
      if (!a.endDate || !b.endDate) return 0;
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    })
    .slice(0, 3);
  
  // Find resources with low chargeability
  const lowChargeabilityResources = resources
    .filter(r => r.chargeability < 70 && r.chargeability > 0)
    .sort((a, b) => a.chargeability - b.chargeability)
    .slice(0, 3);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-accenture-gray-900">Project Manager Dashboard</h1>
          <p className="text-accenture-gray-600 mt-1">
            Monitor your projects, resources, and overall chargeability
          </p>
        </div>
        <div className="hidden md:block">
          <Button onClick={() => navigate('/project-manager/projects')}>
            View All Projects
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Active Projects
                </p>
                <p className="text-2xl font-bold mt-1">{activeProjects}</p>
              </div>
              <div className="rounded-full bg-accenture-purple bg-opacity-10 p-2">
                <Briefcase className="h-5 w-5 text-accenture-purple" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-accenture-purple p-0 h-auto"
                onClick={() => navigate('/project-manager/projects')}
              >
                View projects →
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Resources Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Assigned Resources
                </p>
                <p className="text-2xl font-bold mt-1">{assignedResources} / {totalResources}</p>
              </div>
              <div className="rounded-full bg-blue-500 bg-opacity-10 p-2">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-500 p-0 h-auto"
                onClick={() => navigate('/project-manager/resources')}
              >
                View resources →
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Chargeability Card */}
        <Card className="bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Avg. Chargeability
                </p>
                <p className="text-2xl font-bold mt-1">{avgChargeability}%</p>
              </div>
              <div className="rounded-full bg-green-500 bg-opacity-10 p-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-500 p-0 h-auto"
                onClick={() => navigate('/project-manager/assignments')}
              >
                Manage assignments →
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Unassigned Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Unassigned Resources
                </p>
                <p className="text-2xl font-bold mt-1">{totalResources - assignedResources}</p>
              </div>
              <div className="rounded-full bg-amber-500 bg-opacity-10 p-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-amber-500 p-0 h-auto"
                onClick={() => navigate('/project-manager/resources')}
              >
                Assign resources →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Lower Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Project Deadlines</CardTitle>
            <CardDescription>Projects that will be completed soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-md bg-accenture-gray-50">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-sm text-accenture-gray-500">Client: {project.client}</p>
                        <Badge variant="primary" className="ml-3">
                          {project.endDate}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/project-manager/projects/${project.id}`)}
                    >
                      View
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-accenture-gray-500">
                  <p>No upcoming deadlines</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Resources with Low Chargeability */}
        <Card>
          <CardHeader>
            <CardTitle>Low Chargeability Resources</CardTitle>
            <CardDescription>Resources that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowChargeabilityResources.length > 0 ? (
                lowChargeabilityResources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 rounded-md bg-accenture-gray-50">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-accenture-purple flex items-center justify-center text-white font-medium">
                        {resource.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{resource.name}</p>
                        <p className="text-sm text-accenture-gray-500">{resource.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-medium">{resource.chargeability}%</p>
                      <Badge 
                        variant={resource.chargeability < 50 ? "error" : "warning"}
                        className="mt-1"
                      >
                        Low
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-accenture-gray-500">
                  <p>No resources with low chargeability</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProjectManagerDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/dashboard" element={<DashboardOverview />} />
      <Route path="/projects/*" element={<ProjectManagerProjectsPage />} />
      <Route path="/resources/*" element={<ProjectManagerResourcesPage />} />
      <Route path="/assignments/*" element={<ProjectManagerAssignmentsPage />} />
    </Routes>
  );
};

export default ProjectManagerDashboard;