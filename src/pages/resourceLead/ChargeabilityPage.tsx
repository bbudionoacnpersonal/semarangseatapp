import { useState, useEffect } from 'react';
import { useResourceStore } from '../../stores/resourceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ResourceLeadChargeabilityPage = () => {
  const { resources, fetchResources, isLoading } = useResourceStore();
  
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);
  
  // Calculate chargeability metrics
  const avgChargeability = resources.length > 0
    ? Math.round(resources.reduce((sum, r) => sum + r.chargeability, 0) / resources.length)
    : 0;
  
  const chargeabilityDistribution = {
    high: resources.filter(r => r.chargeability >= 80).length,
    medium: resources.filter(r => r.chargeability >= 50 && r.chargeability < 80).length,
    low: resources.filter(r => r.chargeability > 0 && r.chargeability < 50).length,
    zero: resources.filter(r => r.chargeability === 0).length,
  };
  
  // Prepare data for charts
  const chargeabilityByRole = Object.entries(
    resources.reduce((acc, resource) => {
      if (!acc[resource.role]) {
        acc[resource.role] = {
          role: resource.role,
          avgChargeability: 0,
          count: 0,
        };
      }
      acc[resource.role].avgChargeability += resource.chargeability;
      acc[resource.role].count += 1;
      return acc;
    }, {} as Record<string, { role: string; avgChargeability: number; count: number }>)
  ).map(([_, data]) => ({
    role: data.role,
    avgChargeability: Math.round(data.avgChargeability / data.count),
  }));
  
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-accenture-gray-900">Chargeability Overview</h1>
        <p className="text-accenture-gray-600 mt-1">
          Monitor and analyze resource chargeability across the organization
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Average Chargeability</h3>
            <div className="text-3xl font-bold text-accenture-purple">{avgChargeability}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">High Performers</h3>
            <div className="text-3xl font-bold text-accenture-success">
              {chargeabilityDistribution.high}
              <span className="text-base font-normal text-accenture-gray-500 ml-2">resources</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Need Attention</h3>
            <div className="text-3xl font-bold text-accenture-error">
              {chargeabilityDistribution.low + chargeabilityDistribution.zero}
              <span className="text-base font-normal text-accenture-gray-500 ml-2">resources</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Resources</h3>
            <div className="text-3xl font-bold text-accenture-gray-900">
              {resources.length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chargeability Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Chargeability Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-accenture-gray-100 rounded-full h-4 mb-6">
            <div className="flex rounded-full h-4 overflow-hidden">
              {chargeabilityDistribution.high > 0 && (
                <div 
                  className="bg-accenture-success h-full"
                  style={{ width: `${(chargeabilityDistribution.high / resources.length) * 100}%` }}
                ></div>
              )}
              {chargeabilityDistribution.medium > 0 && (
                <div 
                  className="bg-accenture-warning h-full"
                  style={{ width: `${(chargeabilityDistribution.medium / resources.length) * 100}%` }}
                ></div>
              )}
              {chargeabilityDistribution.low > 0 && (
                <div 
                  className="bg-accenture-error h-full"
                  style={{ width: `${(chargeabilityDistribution.low / resources.length) * 100}%` }}
                ></div>
              )}
              {chargeabilityDistribution.zero > 0 && (
                <div 
                  className="bg-accenture-gray-400 h-full"
                  style={{ width: `${(chargeabilityDistribution.zero / resources.length) * 100}%` }}
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
      
      {/* Chargeability by Role Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Average Chargeability by Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chargeabilityByRole}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgChargeability" fill="#A100FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resources by Chargeability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-accenture-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-accenture-gray-500 uppercase tracking-wider">
                    Resource
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resources
                  .sort((a, b) => b.chargeability - a.chargeability)
                  .map(resource => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-accenture-purple flex items-center justify-center text-white text-sm font-medium">
                            {resource.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-accenture-gray-900">
                              {resource.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-accenture-gray-900">{resource.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-accenture-gray-900">
                          {resource.projectName || 'Unassigned'}
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLeadChargeabilityPage;