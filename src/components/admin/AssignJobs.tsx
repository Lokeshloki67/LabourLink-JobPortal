import React, { useState } from 'react';
import { User, MapPin, Phone, Star, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { CustomerRequest, Laborer, Assignment } from '../../types';

interface AssignJobsProps {
  requests: CustomerRequest[];
  laborers: Laborer[];
  onAssignJob: (requestId: number, laborerId: number) => void;
}

export const AssignJobs: React.FC<AssignJobsProps> = ({ requests, laborers, onAssignJob }) => {
  const [selectedRequest, setSelectedRequest] = useState<CustomerRequest | null>(null);
  const [showModal, setShowModal] = useState(false);

  const pendingRequests = requests.filter(request => request.status === 'pending');

  const getMatchingLaborers = (request: CustomerRequest) => {
    return laborers.filter(laborer => 
      laborer.skill.toLowerCase().includes(request.laborType.toLowerCase()) &&
      laborer.district.toLowerCase() === request.district.toLowerCase() &&
      laborer.available
    ).sort((a, b) => b.rating - a.rating);
  };

  const handleAssignJob = (laborerId: number) => {
    if (selectedRequest) {
      onAssignJob(selectedRequest.id, laborerId);
      setShowModal(false);
      setSelectedRequest(null);
    }
  };

  const openAssignModal = (request: CustomerRequest) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Assign Jobs</h1>
        <p className="text-slate-600">Match customer requests with available workers</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Available Workers</p>
              <p className="text-2xl font-bold text-green-600">
                {laborers.filter(l => l.available).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Ready to Assign</p>
              <p className="text-2xl font-bold text-blue-600">
                {pendingRequests.filter(r => getMatchingLaborers(r).length > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">All Caught Up!</h3>
          <p className="text-slate-600">No pending requests to assign at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingRequests.map(request => {
            const matchingLaborers = getMatchingLaborers(request);
            
            return (
              <div key={request.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">#{request.id}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{request.laborType}</h3>
                      <p className="text-sm text-slate-600">{request.customerName} • {request.district}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      matchingLaborers.length > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {matchingLaborers.length} matches
                    </span>
                    <button
                      onClick={() => openAssignModal(request)}
                      disabled={matchingLaborers.length === 0}
                      className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Assign Worker
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Request Details</h4>
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
                      {request.extraWorkTypes.length > 0 && (
                        <div className="text-sm text-slate-600">
                          <strong>Additional Work:</strong> {request.extraWorkTypes.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Best Matches</h4>
                    {matchingLaborers.length === 0 ? (
                      <div className="text-center py-4 bg-red-50 rounded-lg">
                        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <p className="text-sm text-red-600">No available workers found</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {matchingLaborers.slice(0, 3).map(laborer => (
                          <div key={laborer.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{laborer.name}</p>
                                <p className="text-sm text-slate-600">{laborer.experience}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-slate-600">{laborer.rating}</span>
                            </div>
                          </div>
                        ))}
                        {matchingLaborers.length > 3 && (
                          <p className="text-sm text-slate-600 text-center">
                            +{matchingLaborers.length - 3} more available
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Assignment Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Assign Worker for {selectedRequest.laborType}
            </h3>
            
            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2">Request Details</h4>
              <p className="text-sm text-slate-600">
                <strong>Customer:</strong> {selectedRequest.customerName}<br />
                <strong>Location:</strong> {selectedRequest.district}<br />
                <strong>Work Type:</strong> {selectedRequest.laborType}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-slate-900">Available Workers</h4>
              {getMatchingLaborers(selectedRequest).map(laborer => (
                <div key={laborer.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-slate-900">{laborer.name}</h5>
                        <p className="text-sm text-slate-600">{laborer.skill} • {laborer.experience}</p>
                        <p className="text-sm text-slate-600">{laborer.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-600">{laborer.rating}</span>
                      </div>
                      <button
                        onClick={() => handleAssignJob(laborer.id)}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};