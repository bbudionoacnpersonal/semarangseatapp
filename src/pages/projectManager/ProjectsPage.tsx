import { useState, useEffect } from 'react';
import { useResourceStore, Project } from '../../stores/resourceStore';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardContent
} from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus, Filter } from 'lucide-react';

const ProjectManagerProjectsPage = () => {
  const { projects, fetchProjects, isLoading } = useResourceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  // Filter projects based on search and status
  useEffect(() => {
    let filtered = [...projects];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter]);
  
  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'planned':
        return 'primary';
      case 'completed':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-accenture-gray-900">Projects</h1>
          <p className="text-accenture-gray-600 mt-1">
            Manage and monitor your projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10 w-full"
            placeholder="Search projects by name or client..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center space-x-1 bg-white border border-accenture-gray-300 rounded-md px-3">
          <Filter className="h-4 w-4 text-accenture-gray-500" />
          <select 
            className="bg-transparent py-2 pl-2 pr-8 focus:outline-none text-accenture-gray-900"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="planned">Planned</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      {/* Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(project.status)}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-accenture-gray-600">Client: {project.client}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-accenture-gray-500">Start Date</p>
                      <p className="font-medium">{project.startDate}</p>
                    </div>
                    <div>
                      <p className="text-accenture-gray-500">End Date</p>
                      <p className="font-medium">{project.endDate || 'Ongoing'}</p>
                    </div>
                  </div>
                  
                  {/* Resource allocation progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Resource Allocation</span>
                      <span className="font-medium">
                        {project.assignedResources} / {project.requiredResources}
                      </span>
                    </div>
                    <div className="w-full bg-accenture-gray-100 rounded-full h-2">
                      <div 
                        className="bg-accenture-purple rounded-full h-2"
                        style={{ 
                          width: `${Math.min(100, (project.assignedResources / project.requiredResources) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-accenture-gray-500">No projects found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagerProjectsPage;