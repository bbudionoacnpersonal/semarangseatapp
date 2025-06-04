import { create } from 'zustand';
import { format } from 'date-fns';

export interface Resource {
  id: string;
  name: string;
  role: string;
  projectId: string | null;
  projectName: string | null;
  chargeability: number;
  startDate: string | null;
  endDate: string | null;
  skillset: string[];
  status: 'assigned' | 'available' | 'partially_available';
  seatLocation: string | null;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string | null;
  status: 'active' | 'completed' | 'planned';
  requiredResources: number;
  assignedResources: number;
}

export interface SeatLocation {
  id: string;
  name: string;
  floor: string;
  section: string;
  isAvailable: boolean;
  assignedTo: string | null;
}

interface ResourceState {
  resources: Resource[];
  projects: Project[];
  seats: SeatLocation[];
  isLoading: boolean;
  error: string | null;
  fetchResources: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchSeats: () => Promise<void>;
  assignResourceToProject: (resourceId: string, projectId: string, chargeability: number, startDate: Date, endDate: Date | null) => void;
  removeResourceFromProject: (resourceId: string) => void;
  assignSeat: (resourceId: string, seatId: string) => void;
  releaseSeat: (seatId: string) => void;
}

// Mock data
const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Alice Chen',
    role: 'Software Engineer',
    projectId: 'p1',
    projectName: 'Digital Transformation',
    chargeability: 100,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    skillset: ['React', 'Node.js', 'TypeScript'],
    status: 'assigned',
    seatLocation: 's1',
  },
  {
    id: '2',
    name: 'Bob Williams',
    role: 'UX Designer',
    projectId: 'p1',
    projectName: 'Digital Transformation',
    chargeability: 80,
    startDate: '2024-02-01',
    endDate: null,
    skillset: ['Figma', 'UI/UX Research', 'Prototyping'],
    status: 'assigned',
    seatLocation: 's2',
  },
  {
    id: '3',
    name: 'Carol Martinez',
    role: 'Business Analyst',
    projectId: 'p2',
    projectName: 'ERP Implementation',
    chargeability: 100,
    startDate: '2024-03-10',
    endDate: '2024-08-15',
    skillset: ['Requirements Analysis', 'SQL', 'Process Modeling'],
    status: 'assigned',
    seatLocation: 's3',
  },
  {
    id: '4',
    name: 'Dave Johnson',
    role: 'DevOps Engineer',
    projectId: null,
    projectName: null,
    chargeability: 0,
    startDate: null,
    endDate: null,
    skillset: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    status: 'available',
    seatLocation: 's4',
  },
  {
    id: '5',
    name: 'Eva Brown',
    role: 'Project Manager',
    projectId: 'p3',
    projectName: 'Cloud Migration',
    chargeability: 50,
    startDate: '2024-01-05',
    endDate: '2024-12-31',
    skillset: ['Agile', 'Scrum', 'Risk Management'],
    status: 'partially_available',
    seatLocation: 's5',
  },
];

const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Digital Transformation',
    client: 'ABC Bank',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    status: 'active',
    requiredResources: 5,
    assignedResources: 2,
  },
  {
    id: 'p2',
    name: 'ERP Implementation',
    client: 'XYZ Manufacturing',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    status: 'active',
    requiredResources: 8,
    assignedResources: 1,
  },
  {
    id: 'p3',
    name: 'Cloud Migration',
    client: 'Global Retail Co',
    startDate: '2024-01-05',
    endDate: '2024-12-31',
    status: 'active',
    requiredResources: 6,
    assignedResources: 1,
  },
  {
    id: 'p4',
    name: 'Mobile App Development',
    client: 'FinTech Startup',
    startDate: '2024-06-01',
    endDate: null,
    status: 'planned',
    requiredResources: 4,
    assignedResources: 0,
  },
];

const mockSeats: SeatLocation[] = [
  {
    id: 's1',
    name: 'A-101',
    floor: '1st Floor',
    section: 'Section A',
    isAvailable: false,
    assignedTo: '1',
  },
  {
    id: 's2',
    name: 'A-102',
    floor: '1st Floor',
    section: 'Section A',
    isAvailable: false,
    assignedTo: '2',
  },
  {
    id: 's3',
    name: 'A-103',
    floor: '1st Floor',
    section: 'Section A',
    isAvailable: false,
    assignedTo: '3',
  },
  {
    id: 's4',
    name: 'B-201',
    floor: '2nd Floor',
    section: 'Section B',
    isAvailable: false,
    assignedTo: '4',
  },
  {
    id: 's5',
    name: 'B-202',
    floor: '2nd Floor',
    section: 'Section B',
    isAvailable: false,
    assignedTo: '5',
  },
  {
    id: 's6',
    name: 'B-203',
    floor: '2nd Floor',
    section: 'Section B',
    isAvailable: true,
    assignedTo: null,
  },
  {
    id: 's7',
    name: 'C-301',
    floor: '3rd Floor',
    section: 'Section C',
    isAvailable: true,
    assignedTo: null,
  },
  {
    id: 's8',
    name: 'C-302',
    floor: '3rd Floor',
    section: 'Section C',
    isAvailable: true,
    assignedTo: null,
  },
];

export const useResourceStore = create<ResourceState>((set, get) => ({
  resources: [],
  projects: [],
  seats: [],
  isLoading: false,
  error: null,

  fetchResources: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ resources: mockResources, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch resources', isLoading: false });
    }
  },

  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ projects: mockProjects, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', isLoading: false });
    }
  },

  fetchSeats: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ seats: mockSeats, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch seats', isLoading: false });
    }
  },

  assignResourceToProject: (resourceId, projectId, chargeability, startDate, endDate) => {
    const { resources, projects } = get();
    
    // Find the project
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      set({ error: 'Project not found' });
      return;
    }
    
    // Update resources
    const updatedResources = resources.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          projectId,
          projectName: project.name,
          chargeability,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: endDate ? format(endDate, 'yyyy-MM-dd') : null,
          status: chargeability === 100 ? 'assigned' : 'partially_available',
        };
      }
      return resource;
    });
    
    // Update project
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          assignedResources: p.assignedResources + 1,
        };
      }
      return p;
    });
    
    set({ resources: updatedResources, projects: updatedProjects, error: null });
  },

  removeResourceFromProject: (resourceId) => {
    const { resources, projects } = get();
    
    // Find the resource
    const resource = resources.find(r => r.id === resourceId);
    
    if (!resource || !resource.projectId) {
      set({ error: 'Resource not found or not assigned to a project' });
      return;
    }
    
    const projectId = resource.projectId;
    
    // Update resources
    const updatedResources = resources.map(r => {
      if (r.id === resourceId) {
        return {
          ...r,
          projectId: null,
          projectName: null,
          chargeability: 0,
          startDate: null,
          endDate: null,
          status: 'available',
        };
      }
      return r;
    });
    
    // Update project
    const updatedProjects = projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          assignedResources: Math.max(0, p.assignedResources - 1),
        };
      }
      return p;
    });
    
    set({ resources: updatedResources, projects: updatedProjects, error: null });
  },

  assignSeat: (resourceId, seatId) => {
    const { seats, resources } = get();
    
    // Check if seat is available
    const seat = seats.find(s => s.id === seatId);
    if (!seat || !seat.isAvailable) {
      set({ error: 'Seat is not available' });
      return;
    }
    
    // Update resource's seat
    const updatedResources = resources.map(r => {
      if (r.id === resourceId) {
        // If resource had a previous seat, release it
        if (r.seatLocation) {
          const oldSeatId = r.seatLocation;
          const updatedSeats = seats.map(s => 
            s.id === oldSeatId ? { ...s, isAvailable: true, assignedTo: null } : s
          );
          set({ seats: updatedSeats });
        }
        
        return {
          ...r,
          seatLocation: seatId,
        };
      }
      return r;
    });
    
    // Update seat assignment
    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        return {
          ...s,
          isAvailable: false,
          assignedTo: resourceId,
        };
      }
      return s;
    });
    
    set({ resources: updatedResources, seats: updatedSeats, error: null });
  },

  releaseSeat: (seatId) => {
    const { seats, resources } = get();
    
    // Find which resource has this seat
    const resourceWithSeat = resources.find(r => r.seatLocation === seatId);
    
    // Update resource
    if (resourceWithSeat) {
      const updatedResources = resources.map(r => {
        if (r.id === resourceWithSeat.id) {
          return {
            ...r,
            seatLocation: null,
          };
        }
        return r;
      });
      set({ resources: updatedResources });
    }
    
    // Update seat
    const updatedSeats = seats.map(s => {
      if (s.id === seatId) {
        return {
          ...s,
          isAvailable: true,
          assignedTo: null,
        };
      }
      return s;
    });
    
    set({ seats: updatedSeats, error: null });
  }
}));