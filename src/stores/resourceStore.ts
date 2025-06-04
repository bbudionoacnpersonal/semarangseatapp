import { create } from 'zustand';
import { format } from 'date-fns';
import { mockResources } from '../mockData/resources';
import { mockProjects } from '../mockData/projects';
import { mockSeats } from '../mockData/seats';

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