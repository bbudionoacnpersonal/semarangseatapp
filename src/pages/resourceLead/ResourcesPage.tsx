import { useState, useEffect } from 'react';
import { useResourceStore, Resource } from '../../stores/resourceStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, Plus } from 'lucide-react';

const ResourceLeadResourcesPage = () => {
  const { resources, fetchResources, isLoading } = useResourceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);
  
  // Filter resources based on search and status
  useEffect(() => {
    let filtered = [...resources];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.projectName && resource.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(resource => resource.status === statusFilter);
    }
    
    setFilteredResources(filtered);
  }, [resources, searchTerm, statusFilter]);
  
  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'success';
      case 'partially_available':
        return 'warning';
      case 'available':
        return 'primary';
      default:
        return 'default';
    }
  };
  
  // Format status label
  const formatStatusLabel = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-accenture-gray-900">All Resources</h1>
          <p className="text-accenture-gray-600 mt-1">
            Manage and monitor all resources across projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
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
            placeholder="Search resources by name, role, or project..."
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
            <option value="assigned">Assigned</option>
            <option value="partially_available">Partially Available</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>
      
      {/* Resources Table */}
      <div className="bg-white rounded-lg shadow-accenture overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-accenture-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Chargeability
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Seat
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-accenture-gray-500">
                    Loading resources...
                  </td>
                </tr>
              ) : filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-accenture-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-accenture-purple flex items-center justify-center text-white font-medium">
                          {resource.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-accenture-gray-900">{resource.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-accenture-gray-900">{resource.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-accenture-gray-900">
                        {resource.projectName || 'Not assigned'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-accenture-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`rounded-full h-2 ${
                              resource.chargeability >= 80 
                                ? 'bg-accenture-success' 
                                : resource.chargeability >= 50 
                                  ? 'bg-accenture-warning' 
                                  : 'bg-accenture-error'
                            }`}
                            style={{ width: `${resource.chargeability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-accenture-gray-900">{resource.chargeability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(resource.status)}>
                        {formatStatusLabel(resource.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-accenture-gray-900">
                        {resource.seatLocation ? `Seat ${resource.seatLocation}` : 'No seat'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button variant="link" size="sm" className="ml-2">
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-accenture-gray-500">
                    No resources found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceLeadResourcesPage;