import { useState, useEffect } from 'react';
import { useResourceStore, SeatLocation } from '../../stores/resourceStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, Plus } from 'lucide-react';

const ResourceLeadSeatsPage = () => {
  const { seats, resources, fetchSeats, fetchResources, isLoading } = useResourceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [floorFilter, setFloorFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [filteredSeats, setFilteredSeats] = useState<SeatLocation[]>([]);
  
  useEffect(() => {
    fetchSeats();
    fetchResources();
  }, [fetchSeats, fetchResources]);
  
  // Get unique floors and sections
  const floors = Array.from(new Set(seats.map(seat => seat.floor)));
  const sections = Array.from(new Set(seats.map(seat => seat.section)));
  
  // Filter seats based on search and filters
  useEffect(() => {
    let filtered = [...seats];
    
    if (searchTerm) {
      filtered = filtered.filter(seat => 
        seat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (seat.assignedTo && resources.find(r => r.id === seat.assignedTo)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (floorFilter !== 'all') {
      filtered = filtered.filter(seat => seat.floor === floorFilter);
    }
    
    if (sectionFilter !== 'all') {
      filtered = filtered.filter(seat => seat.section === sectionFilter);
    }
    
    setFilteredSeats(filtered);
  }, [seats, resources, searchTerm, floorFilter, sectionFilter]);
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-accenture-gray-900">Seat Management</h1>
          <p className="text-accenture-gray-600 mt-1">
            Manage and monitor seat assignments
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Seat
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
            placeholder="Search by seat number or assigned person..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Floor Filter */}
        <div className="flex items-center space-x-1 bg-white border border-accenture-gray-300 rounded-md px-3">
          <Filter className="h-4 w-4 text-accenture-gray-500" />
          <select 
            className="bg-transparent py-2 pl-2 pr-8 focus:outline-none text-accenture-gray-900"
            value={floorFilter}
            onChange={e => setFloorFilter(e.target.value)}
          >
            <option value="all">All Floors</option>
            {floors.map(floor => (
              <option key={floor} value={floor}>{floor}</option>
            ))}
          </select>
        </div>
        
        {/* Section Filter */}
        <div className="flex items-center space-x-1 bg-white border border-accenture-gray-300 rounded-md px-3">
          <Filter className="h-4 w-4 text-accenture-gray-500" />
          <select 
            className="bg-transparent py-2 pl-2 pr-8 focus:outline-none text-accenture-gray-900"
            value={sectionFilter}
            onChange={e => setSectionFilter(e.target.value)}
          >
            <option value="all">All Sections</option>
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Seats Table */}
      <div className="bg-white rounded-lg shadow-accenture overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-accenture-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Seat Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Floor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Section
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-accenture-gray-500">
                    Loading seats...
                  </td>
                </tr>
              ) : filteredSeats.length > 0 ? (
                filteredSeats.map((seat) => {
                  const assignedResource = resources.find(r => r.id === seat.assignedTo);
                  
                  return (
                    <tr key={seat.id} className="hover:bg-accenture-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-accenture-gray-900">{seat.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-accenture-gray-900">{seat.floor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-accenture-gray-900">{seat.section}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={seat.isAvailable ? 'success' : 'primary'}>
                          {seat.isAvailable ? 'Available' : 'Occupied'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {assignedResource ? (
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-accenture-purple flex items-center justify-center text-white text-sm font-medium">
                              {assignedResource.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-accenture-gray-900">
                                {assignedResource.name}
                              </div>
                              <div className="text-sm text-accenture-gray-500">
                                {assignedResource.role}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-accenture-gray-500">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm">
                          {seat.isAvailable ? 'Assign' : 'Release'}
                        </Button>
                        <Button variant="link" size="sm" className="ml-2">
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-accenture-gray-500">
                    No seats found matching your search criteria.
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

export default ResourceLeadSeatsPage;