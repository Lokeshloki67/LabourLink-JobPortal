import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, User, Phone, MapPin, Calendar, DollarSign, MessageCircle, AlertCircle, Check, X } from 'lucide-react';
import { Assignment, CustomerRequest } from '../../types';

interface MyJobsProps {
  assignments: Assignment[];
  onUpdateJobStatus: (assignmentId: number, status: 'completed' | 'cancelled') => void;
}

export const MyJobs: React.FC<MyJobsProps> = ({ assignments, onUpdateJobStatus }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showJobDetails, setShowJobDetails] = useState<number | null>(null);
  const [jobActions, setJobActions] = useState<{ [key: number]: 'accept' | 'decline' | null }>({});

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const handleJobAction = (assignmentId: number, action: 'accept' | 'decline') => {
    setJobActions(prev => ({ ...prev, [assignmentId]: action }));
    
    if (action === 'accept') {
      // Auto-update status to in-progress when accepted
      setTimeout(() => {
        alert('Job accepted! Customer has been notified.');
      }, 500);
    } else {
      // Handle decline
      setTimeout(() => {
        onUpdateJobStatus(assignmentId, 'cancelled');
        alert('Job declined. We will find another worker for the customer.');
      }, 500);
    }
  };

  const handleCallSupport = () => {
    alert('Calling LaborLink Support at +91-9876543210...');
  };

  const handleCallCustomer = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}...`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

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

  if (assignments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">My Jobs</h1>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Jobs Assigned</h3>
            <p className="text-slate-600 mb-6">You don't have any jobs assigned yet. Check back later!</p>
            <button
              onClick={handleCallSupport}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Jobs</h1>
            <p className="text-slate-600">Manage your work assignments and customer orders</p>
          </div>
          <button
            onClick={handleCallSupport}
            className="flex items-center space-x-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Call Support</span>
          </button>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Jobs ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({assignments.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed ({assignments.filter(a => a.status === 'completed').length})
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredAssignments.map(assignment => {
          const isExpanded = showJobDetails === assignment.id;
          const jobAction = jobActions[assignment.id];
          
          return (
            <div key={assignment.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">#{assignment.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{assignment.customer.laborType}</h3>
                    <p className="text-sm text-slate-600">{new Date(assignment.assignedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(assignment.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Job Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">Customer</h4>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-slate-600">
                      <User className="h-4 w-4 mr-2" />
                      {assignment.customer.customerName}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {assignment.customer.phone}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {assignment.customer.district}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">Job Details</h4>
                  <div className="space-y-1">
                    <div className="text-sm text-slate-600">
                      <strong>Service:</strong> {assignment.customer.laborType}
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong>Date:</strong> {new Date(assignment.assignedAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong>Time:</strong> {new Date(assignment.assignedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">Payment</h4>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">
                      ₹{assignment.earnings || 500}
                    </div>
                    <div className="text-sm text-slate-600">Your earnings</div>
                    {assignment.distance && (
                      <div className="text-sm text-slate-600">
                        Distance: {Math.round(assignment.distance)}km
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Actions for Pending Jobs */}
              {assignment.status === 'pending' && !jobAction && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-medium text-yellow-800">New Job Assignment</span>
                  </div>
                  <p className="text-yellow-700 text-sm mb-4">
                    You have been assigned this job. Please accept or decline within 30 minutes.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleJobAction(assignment.id, 'accept')}
                      className="flex items-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4" />
                      <span>Accept Job</span>
                    </button>
                    <button
                      onClick={() => handleJobAction(assignment.id, 'decline')}
                      className="flex items-center space-x-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Decline Job</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Job Action Status */}
              {jobAction && (
                <div className={`border rounded-lg p-4 mb-4 ${
                  jobAction === 'accept' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center">
                    {jobAction === 'accept' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className={`font-medium ${
                      jobAction === 'accept' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      Job {jobAction === 'accept' ? 'Accepted' : 'Declined'}
                    </span>
                  </div>
                </div>
              )}

              {/* Expandable Details */}
              <button
                onClick={() => setShowJobDetails(isExpanded ? null : assignment.id)}
                className="w-full text-left text-blue-600 hover:text-blue-700 font-medium text-sm mb-4"
              >
                {isExpanded ? 'Hide Details' : 'Show Full Details'}
              </button>

              {isExpanded && (
                <div className="border-t border-slate-200 pt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Complete Address</h4>
                    <p className="text-slate-600 text-sm">{assignment.customer.address}</p>
                  </div>

                  {assignment.customer.workDescription && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Work Description</h4>
                      <p className="text-slate-600 text-sm">{assignment.customer.workDescription}</p>
                    </div>
                  )}

                  {assignment.customer.extraWorkTypes.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Additional Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {assignment.customer.extraWorkTypes.map(service => (
                          <span key={service} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {assignment.customer.urgency && assignment.customer.urgency !== 'normal' && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Urgency Level</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.customer.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {assignment.customer.urgency.toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Payment Breakdown</h4>
                    <div className="bg-slate-50 rounded-lg p-3 text-sm">
                      <div className="flex justify-between">
                        <span>Service Cost:</span>
                        <span>₹{assignment.customer.actualCost || assignment.earnings || 500}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Share (80%):</span>
                        <span className="font-medium text-green-600">₹{assignment.earnings || 500}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Platform Fee (20%):</span>
                        <span>₹{Math.round((assignment.customer.actualCost || assignment.earnings || 500) * 0.2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => handleCallCustomer(assignment.customer.phone, assignment.customer.customerName)}
                  className="flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Customer</span>
                </button>

                <button
                  onClick={handleCallSupport}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Call Support</span>
                </button>

                {assignment.status === 'pending' && jobAction === 'accept' && (
                  <button
                    onClick={() => onUpdateJobStatus(assignment.id, 'completed')}
                    className="flex items-center justify-center space-x-2 bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Mark Completed</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};