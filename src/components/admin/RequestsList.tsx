import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, User, Phone, MapPin, Filter } from 'lucide-react';
import { CustomerRequest, Laborer } from '../../types';

interface RequestsListProps {
  requests: CustomerRequest[];
  laborers: Laborer[];
  onUpdateRequestStatus: (requestId: number, status: CustomerRequest['status']) => void;
}

export const RequestsList: React.FC<RequestsListProps> = ({ 
  requests, 
  laborers, 
  onUpdateRequestStatus 
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | CustomerRequest['status']>('all');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterLaborType, setFilterLaborType] = useState('');

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesDistrict = !filterDistrict || request.district === filterDistrict;
    const matchesLaborType = !filterLaborType || request.laborType === filterLaborType;
    
    return matchesStatus && matchesDistrict && matchesLaborType;
  });

  const uniqueDistricts = [...new Set(requests.map(r => r.district))];
  const uniqueLaborTypes = [...new Set(requests.map(r => r.laborType))];

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Requests</h1>
        <p className="text-slate-600">Manage and track all customer service requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Requests</p>
              <p className="text-2xl font-bold text-slate-900">{requests.length}</p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {requests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Assigned</p>
              <p className="text-2xl font-bold text-blue-600">
                {requests.filter(r => r.status === 'assigned').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Districts</option>
            {uniqueDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          
          <select
            value={filterLaborType}
            onChange={(e) => setFilterLaborType(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Labor Types</option>
            {uniqueLaborTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <div className="text-sm text-slate-600 flex items-center">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {filteredRequests.map(request => {
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Customer Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <User className="h-4 w-4 mr-2" />
                      {request.customerName}
                    </div>
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
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Work Details</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-slate-600">
                      <strong>Primary Work:</strong> {request.laborType}
                    </div>
                    {request.extraWorkTypes.length > 0 && (
                      <div className="text-sm text-slate-600">
                        <strong>Additional Work:</strong> {request.extraWorkTypes.join(', ')}
                      </div>
                    )}
                    <div className="text-sm text-slate-600">
                      <strong>Requested:</strong> {new Date(request.timestamp).toLocaleString()}
                    </div>
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
                      <div className="text-sm text-slate-600">
                        <p>{assignedLaborer.phone}</p>
                        <p>{assignedLaborer.experience}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {request.status === 'pending' && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onUpdateRequestStatus(request.id, 'assigned')}
                      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Assign Worker
                    </button>
                    <button
                      onClick={() => onUpdateRequestStatus(request.id, 'cancelled')}
                      className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Cancel Request
                    </button>
                  </div>
                </div>
              )}

              {request.rating && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-slate-700">Customer Rating:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className={`text-sm ${star <= request.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
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

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Requests Found</h3>
          <p className="text-slate-600">No requests match your current filters.</p>
        </div>
      )}
    </div>
  );
};