import React from 'react';
import { Clock, CheckCircle, XCircle, User, Phone, MapPin, Star } from 'lucide-react';
import { CustomerRequest, Laborer } from '../../types';

interface MyRequestsProps {
  requests: CustomerRequest[];
  laborers: Laborer[];
  onRateJob: (requestId: number, rating: number, feedback: string) => void;
}

export const MyRequests: React.FC<MyRequestsProps> = ({ requests, laborers, onRateJob }) => {
  const getAssignedLaborer = (requestId: number) => {
    const request = requests.find(r => r.id === requestId);
    if (request?.assignedLaborerId) {
      return laborers.find(l => l.id === request.assignedLaborerId);
    }
    return null;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'assigned':
        return <User className="h-5 w-5 text-blue-500" />;
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
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (requests.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">My Requests</h1>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Requests Yet</h3>
            <p className="text-slate-600">You haven't submitted any work requests yet. Start by requesting a worker!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Requests</h1>
        <p className="text-slate-600">Track the status of your work requests</p>
      </div>

      <div className="space-y-6">
        {requests.map(request => {
          const assignedLaborer = getAssignedLaborer(request.id);
          
          return (
            <div key={request.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">#{request.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{request.laborType}</h3>
                    <p className="text-sm text-slate-600">{new Date(request.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Request Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {request.phone}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {request.district}
                    </div>
                    <div className="text-sm text-slate-600">
                      <strong>Address:</strong> {request.address}
                    </div>
                    {request.extraWorkTypes.length > 0 && (
                      <div className="text-sm text-slate-600">
                        <strong>Additional Work:</strong> {request.extraWorkTypes.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {assignedLaborer && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Assigned Worker</h4>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{assignedLaborer.name}</p>
                          <p className="text-sm text-slate-600">{assignedLaborer.skill}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-slate-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {assignedLaborer.phone}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{assignedLaborer.experience}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-slate-600">{assignedLaborer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {request.status === 'completed' && !request.rating && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">Rate this job</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => onRateJob(request.id, rating, '')}
                          className="text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">Click to rate</span>
                  </div>
                </div>
              )}

              {request.rating && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-700">Your Rating:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= request.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">({request.rating}/5)</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};