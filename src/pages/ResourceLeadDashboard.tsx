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
import { Users, MapPin, BarChart3, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Import sub-pages (to be created)
import ResourceLeadResourcesPage from './resourceLead/ResourcesPage';
import ResourceLeadProjectsPage from './resourceLead/ProjectsPage';
import ResourceLeadSeatsPage from './resourceLead/SeatsPage';
import ResourceLeadChargeabilityPage from './resourceLead/ChargeabilityPage';
import ResourceLeadFinancePage from './resourceLead/FinancePage';

// Dashboard overview component
const DashboardOverview = () => {
  const { resources, projects, seats, fetchResources, fetchProjects, fetchSeats, isLoading } = useResourceStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchResources();
    fetchProjects();
    fetchSeats();
  }, [fetchResources, fetchProjects, fetchSeats]);

  // Calculate metrics
  const totalResources = resources.length;
  const assignedResources = resources.filter(r => r.projectId !== null).length;
  const unassignedResources = totalResources - assignedResources;
  const avgChargeability = resources.length > 0
    ? Math.round(resources.reduce((sum, r) => sum + r.chargeability, 0) / resources.length)
    : 0;
  
  const availableSeats = seats.filter(s => s.isAvailable).length;
  const totalSeats = seats.length;
  
  // Group resources by chargeability ranges
  const chargeabilityDistribution = {
    high: resources.filter(r => r.chargeability >= 80).length,
    medium: resources.filter(r => r.chargeability >= 50 && r.chargeability < 80).length,
    low: resources.filter(r => r.chargeability > 0 && r.chargeability < 50).length,
    zero: resources.filter(r => r.chargeability === 0).length,
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-accenture-gray-900">Resource Lead Dashboard</h1>
          <p className="text-accenture-gray-600 mt-1">
            Monitor overall resource allocation, chargeability, and seat management
          </p>
        </div>
        <div className="hidden md:block">
          <Button onClick={() => navigate('/resource-lead/resources')}>
            View All Resources
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Resources Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Total Resources
                </p>
                <p className="text-2xl font-bold mt-1">{totalResources}</p>
              </div>
              <div className="rounded-full bg-accenture-purple bg-opacity-10 p-2">
                <Users className="h-5 w-5 text-accenture-purple" />
              </div>
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span className="text-accenture-gray-600">Assigned: {assignedResources}</span>
              <span className="text-accenture-gray-600">Unassigned: {unassignedResources}</span>
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
                onClick={() => navigate('/resource-lead/chargeability')}
              >
                View chargeability details →
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Seats Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Seat Utilization
                </p>
                <p className="text-2xl font-bold mt-1">{totalSeats - availableSeats} / {totalSeats}</p>
              </div>
              <div className="rounded-full bg-blue-500 bg-opacity-10 p-2">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-500 p-0 h-auto"
                onClick={() => navigate('/resource-lead/seats')}
              >
                Manage seats →
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Projects Card */}
        <Card className="bg-gradient-to-br from-amber-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-accenture-gray-600">
                  Active Projects
                </p>
                <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'active').length}</p>
              </div>
              <div className="rounded-full bg-amber-500 bg-opacity-10 p-2">
                <Briefcase className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-amber-500 p-0 h-auto"
                onClick={() => navigate('/resource-lead/projects')}
              >
                View projects →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chargeability Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Chargeability Distribution</CardTitle>
          <CardDescription>Overview of resource chargeability status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-accenture-gray-100 rounded-full h-4 mb-6">
            <div className="flex rounded-full h-4 overflow-hidden">
              {chargeabilityDistribution.high > 0 && (
                <div 
                  className="bg-accenture-success h-full"
                  style={{ width: `${(chargeabilityDistribution.high / totalResources) * 100}%` }}
                ></div>
              )}
              {chargeabilityDistribution.medium > 0 && (
                <div 
                  className="bg-accenture-warning h-full"
                  style={{ width: `${(chargeabilityDistribution.medium / totalResources) * 100}%` }}
                ></div>
              )}
              {chargeabilityDistribution.low > 0 && (
                <div 
                  className="bg-accenture-error h-full"
                  style={{ width: `${(chargeabilityDistribution.low / totalResources) * 100}%` }}
                ></div>
              )}
              {chargeabilityDistribution.zero > 0 && (
                <div 
                  className="bg-accenture-gray-400 h-full"
                  style={{ width: `${(chargeabilityDistribution.zero / totalResources) * 100}%` }}
                ></div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 bg-accenture-gray-50 rounded-lg">
              <Badge variant="success" className="mb-1">High</Badge>
              <span className="text-xl font-bold">{chargeabilityDistribution.high}</span>
              <span className="text-sm text-accenture-gray-500">80-100%</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-accenture-gray-50 rounded-lg">
              <Badge variant="warning" className="mb-1">Medium</Badge>
              <span className="text-xl font-bold">{chargeabilityDistribution.medium}</span>
              <span className="text-sm text-accenture-gray-500">50-79%</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-accenture-gray-50 rounded-lg">
              <Badge variant="error" className="mb-1">Low</Badge>
              <span className="text-xl font-bold">{chargeabilityDistribution.low}</span>
              <span className="text-sm text-accenture-gray-500">1-49%</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-accenture-gray-50 rounded-lg">
              <Badge variant="default" className="mb-1">Zero</Badge>
              <span className="text-xl font-bold">{chargeabilityDistribution.zero}</span>
              <span className="text-sm text-accenture-gray-500">0%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => navigate('/resource-lead/resources')}
          className="h-auto py-6 flex flex-col items-center justify-center"
        >
          <Users className="h-6 w-6 mb-2" />
          <span>Manage Resources</span>
        </Button>
        <Button 
          onClick={() => navigate('/resource-lead/seats')}
          variant="secondary"
          className="h-auto py-6 flex flex-col items-center justify-center"
        >
          <MapPin className="h-6 w-6 mb-2" />
          <span>Assign Seats</span>
        </Button>
        <Button 
          onClick={() => navigate('/resource-lead/chargeability')}
          variant="outline"
          className="h-auto py-6 flex flex-col items-center justify-center"
        >
          <BarChart3 className="h-6 w-6 mb-2" />
          <span>View Chargeability Reports</span>
        </Button>
      </div>
    </div>
  );
};

const ResourceLeadDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/dashboard" element={<DashboardOverview />} />
      <Route path="/resources/*" element={<ResourceLeadResourcesPage />} />
      <Route path="/projects/*" element={<ResourceLeadProjectsPage />} />
      <Route path="/seats/*" element={<ResourceLeadSeatsPage />} />
      <Route path="/chargeability/*" element={<ResourceLeadChargeabilityPage />} />
      <Route path="/finance/*" element={<ResourceLeadFinancePage />} />
    </Routes>
  );
};

export default ResourceLeadDashboard;