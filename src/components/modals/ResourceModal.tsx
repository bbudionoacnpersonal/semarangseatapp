import { useState } from 'react';
import { X, Calendar, Briefcase, MapPin, BarChart3 } from 'lucide-react';
import { Resource } from '../../stores/resourceStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ResourceModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'manage';
}

export function ResourceModal({ resource, isOpen, onClose, mode }: ResourceModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'projects' | 'skills'>('details');

  if (!isOpen) return null;

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

  const formatStatusLabel = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-accenture-purple flex items-center justify-center text-white text-lg font-medium">
              {resource.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{resource.name}</h2>
              <p className="text-sm text-gray-500">{resource.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'details'
                  ? 'border-accenture-purple text-accenture-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'projects'
                  ? 'border-accenture-purple text-accenture-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'skills'
                  ? 'border-accenture-purple text-accenture-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Skills
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-gray-900">{resource.startDate || 'Not assigned'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">End Date</span>
                  </div>
                  <p className="text-gray-900">{resource.endDate || 'Ongoing'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Current Project</span>
                </div>
                <p className="text-gray-900">{resource.projectName || 'Not assigned'}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Seat Assignment</span>
                </div>
                <p className="text-gray-900">
                  {resource.seatLocation ? `Seat ${resource.seatLocation}` : 'No seat assigned'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Chargeability</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          resource.chargeability >= 80
                            ? 'bg-accenture-success'
                            : resource.chargeability >= 50
                            ? 'bg-accenture-warning'
                            : 'bg-accenture-error'
                        }`}
                        style={{ width: `${resource.chargeability}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="font-medium">{resource.chargeability}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <div>
                  <Badge variant={getStatusBadgeVariant(resource.status)}>
                    {formatStatusLabel(resource.status)}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              {resource.projectId ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{resource.projectName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {resource.startDate} - {resource.endDate || 'Ongoing'}
                  </p>
                  <div className="mt-4">
                    <Badge variant={resource.chargeability >= 80 ? 'success' : 'warning'}>
                      {resource.chargeability}% Utilized
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No project assignments</p>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {resource.skillset.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {mode === 'manage' && (
              <Button>
                Update Resource
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}