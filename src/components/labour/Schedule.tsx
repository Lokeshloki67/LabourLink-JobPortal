import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Briefcase } from 'lucide-react';
import { Assignment } from '../../types';

interface ScheduleProps {
  assignments: Assignment[];
}

export const Schedule: React.FC<ScheduleProps> = ({ assignments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Group assignments by date
  const groupedAssignments = assignments.reduce((acc, assignment) => {
    const date = new Date(assignment.assignedAt).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(assignment);
    return acc;
  }, {} as Record<string, Assignment[]>);

  const selectedDateAssignments = groupedAssignments[selectedDate] || [];

  // Get upcoming assignments (next 7 days)
  const upcomingAssignments = assignments.filter(assignment => {
    const assignmentDate = new Date(assignment.assignedAt);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return assignmentDate >= today && assignmentDate <= nextWeek && assignment.status === 'pending';
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Schedule</h1>
        <p className="text-slate-600">Manage your work schedule and upcoming jobs</p>
      </div>

      {/* Upcoming Jobs Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Jobs This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{upcomingAssignments.length}</p>
            <p className="text-sm text-slate-600">Pending Jobs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {assignments.filter(a => a.status === 'completed').length}
            </p>
            <p className="text-sm text-slate-600">Completed Jobs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              ₹{upcomingAssignments.reduce((sum, a) => sum + (a.earnings || 500), 0)}
            </p>
            <p className="text-sm text-slate-600">Potential Earnings</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="mt-6">
              <h4 className="font-medium text-slate-900 mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Jobs:</span>
                  <span className="font-medium text-slate-900">{assignments.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">This Month:</span>
                  <span className="font-medium text-slate-900">
                    {assignments.filter(a => {
                      const date = new Date(a.assignedAt);
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Pending:</span>
                  <span className="font-medium text-yellow-600">
                    {assignments.filter(a => a.status === 'pending').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Jobs for {new Date(selectedDate).toLocaleDateString()}
            </h3>
            
            {selectedDateAssignments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">No Jobs Scheduled</h4>
                <p className="text-slate-600">You don't have any jobs scheduled for this date.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateAssignments.map(assignment => (
                  <div key={assignment.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">#{assignment.id}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{assignment.customer.laborType}</h4>
                          <p className="text-sm text-slate-600">{assignment.customer.customerName}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-slate-600">
                        <User className="h-4 w-4 mr-2" />
                        {assignment.customer.customerName}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {assignment.customer.district}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {new Date(assignment.assignedAt).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        ₹{assignment.earnings || 500}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-slate-600">
                      <strong>Address:</strong> {assignment.customer.address}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Jobs List */}
      {upcomingAssignments.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Jobs</h3>
          <div className="space-y-3">
            {upcomingAssignments.slice(0, 5).map(assignment => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">#{assignment.id}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{assignment.customer.laborType}</p>
                    <p className="text-sm text-slate-600">{assignment.customer.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {new Date(assignment.assignedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-green-600">₹{assignment.earnings || 500}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};