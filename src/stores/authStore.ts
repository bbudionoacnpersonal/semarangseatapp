import { create } from 'zustand';
import { mockUsers } from '../mockData/users';

export type UserRole = 'project_manager' | 'resource_lead';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      set({ 
        user: userWithoutPassword, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      // Save to session storage
      sessionStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Login failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    sessionStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
}));

// Initialize auth state from session storage
const initializeAuth = () => {
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.getState().user = user;
      useAuthStore.getState().isAuthenticated = true;
    } catch (error) {
      console.error('Failed to parse stored user:', error);
    }
  }
};

// Call initialization
initializeAuth();