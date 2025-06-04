import { UserRole } from '../stores/authStore';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatarUrl: string;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@accenture.com',
    password: 'manager123',
    role: 'project_manager',
    avatarUrl: 'https://i.pravatar.cc/150?u=john',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@accenture.com',
    password: 'resource123',
    role: 'resource_lead',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
  },
];