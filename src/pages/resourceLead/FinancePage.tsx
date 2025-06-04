import { useState, useEffect } from 'react';
import { useResourceStore } from '../../stores/resourceStore';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ResourceLeadFinancePage = () => {
  const { resources, projects, fetchResources, fetchProjects, isLoading } = useResourceStore();
  
  useEffect(() => {
    fetchResources();
    fetchProjects();
  }, [fetchResources, fetchProjects]);
  
  // Calculate financial metrics
  const totalResources = resources.length;
  const chargeableResources = resources.filter(r => r.chargeability > 0).length;
  const avgChargeability = resources.length > 0
    ? Math.round(resources.reduce((sum, r) => sum + r.chargeability, 0) / resources.length)
    : 0;
  
  // Mock financial data (in a real app, this would come from the backend)
  const mockFinancialData = [
    { month: 'Jan', revenue: 450000, cost: 380000, profit: 70000 },
    { month: 'Feb', revenue: 480000, cost: 390000, profit: 90000 },
    { month: 'Mar', revenue: 520000, cost: 410000, profit: 110000 },
    { month: 'Apr', revenue: 510000, cost: 400000, profit: 110000 },
    { month: 'May', revenue: 550000, cost: 420000, profit: 130000 },
    { month: 'Jun', revenue: 580000, cost: 430000, profit: 150000 },
  ];
  
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-accenture-gray-900">Financial Overview</h1>
        <p className="text-accenture-gray-600 mt-1">
          Monitor financial performance and resource utilization
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold text-accenture-purple">
              $580K
              <span className="text-base font-normal text-accenture-gray-500 ml-2">this month</span>
            </div>
            <p className="text-sm text-accenture-success mt-2">↑ 12% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Resource Cost</h3>
            <div className="text-3xl font-bold text-accenture-gray-900">
              $430K
              <span className="text-base font-normal text-accenture-gray-500 ml-2">this month</span>
            </div>
            <p className="text-sm text-accenture-error mt-2">↑ 5% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Profit Margin</h3>
            <div className="text-3xl font-bold text-accenture-success">
              25.9%
              <span className="text-base font-normal text-accenture-gray-500 ml-2">this month</span>
            </div>
            <p className="text-sm text-accenture-success mt-2">↑ 2.3% vs last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Avg. Chargeability</h3>
            <div className="text-3xl font-bold text-accenture-purple">
              {avgChargeability}%
            </div>
            <p className="text-sm text-accenture-success mt-2">↑ 3% vs last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockFinancialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#A100FF" strokeWidth={2} />
                <Line type="monotone" dataKey="cost" stroke="#595959" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#25D366" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Resource Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Chargeability Distribution</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>High (80-100%)</span>
                    <span className="font-medium">
                      {resources.filter(r => r.chargeability >= 80).length} resources
                    </span>
                  </div>
                  <div className="w-full bg-accenture-gray-100 rounded-full h-2">
                    <div 
                      className="bg-accenture-success rounded-full h-2"
                      style={{ 
                        width: `${(resources.filter(r => r.chargeability >= 80).length / totalResources) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Medium (50-79%)</span>
                    <span className="font-medium">
                      {resources.filter(r => r.chargeability >= 50 && r.chargeability < 80).length} resources
                    </span>
                  </div>
                  <div className="w-full bg-accenture-gray-100 rounded-full h-2">
                    <div 
                      className="bg-accenture-warning rounded-full h-2"
                      style={{ 
                        width: `${(resources.filter(r => r.chargeability >= 50 && r.chargeability < 80).length / totalResources) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Low (1-49%)</span>
                    <span className="font-medium">
                      {resources.filter(r => r.chargeability > 0 && r.chargeability < 50).length} resources
                    </span>
                  </div>
                  <div className="w-full bg-accenture-gray-100 rounded-full h-2">
                    <div 
                      className="bg-accenture-error rounded-full h-2"
                      style={{ 
                        width: `${(resources.filter(r => r.chargeability > 0 && r.chargeability < 50).length / totalResources) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Unassigned (0%)</span>
                    <span className="font-medium">
                      {resources.filter(r => r.chargeability === 0).length} resources
                    </span>
                  </div>
                  <div className="w-full bg-accenture-gray-100 rounded-full h-2">
                    <div 
                      className="bg-accenture-gray-400 rounded-full h-2"
                      style={{ 
                        width: `${(resources.filter(r => r.chargeability === 0).length / totalResources) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Project Distribution</h4>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{project.name}</span>
                      <span className="font-medium">
                        {project.assignedResources} / {project.requiredResources} resources
                      </span>
                    </div>
                    <div className="w-full bg-accenture-gray-100 rounded-full h-2">
                      <div 
                        className="bg-accenture-purple rounded-full h-2"
                        style={{ 
                          width: `${(project.assignedResources / project.requiredResources) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLeadFinancePage;