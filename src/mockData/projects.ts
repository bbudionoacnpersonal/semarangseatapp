import { Project } from '../stores/resourceStore';

export const mockProjects: Project[] = [
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