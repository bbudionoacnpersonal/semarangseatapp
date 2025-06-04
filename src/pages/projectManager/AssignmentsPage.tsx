import React from 'react';
import { Card } from '@/components/ui/Card';

export default function AssignmentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Project Assignments</h1>
      <Card className="p-6">
        <p className="text-gray-600">Manage your project assignments here.</p>
      </Card>
    </div>
  );
}