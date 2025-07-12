import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { PublicNavigation } from './components/PublicNavigation';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import { Navigation } from './components/Navigation';
import { RequestForm } from './components/customer/RequestForm';
import { MyRequests } from './components/customer/MyRequests';
import { JobTypes } from './components/customer/JobTypes';
import { MyJobs } from './components/labour/MyJobs';
import { Earnings } from './components/labour/Earnings';
import { CustomerInfo } from './components/labour/CustomerInfo';
import { PersonalDetails } from './components/labour/PersonalDetails';
import { Schedule } from './components/labour/Schedule';
import { LaborersList } from './components/admin/LaborersList';
import { RequestsList } from './components/admin/RequestsList';
import { AssignJobs } from './components/admin/AssignJobs';
import { CheckCircle, XCircle, Clock, User as UserIcon, Phone } from 'lucide-react';
import type { User, Laborer, CustomerRequest, Assignment, AuthState } from './types';
import { sampleUsers, generateComprehensiveLaborers } from './data/sampleData';
import { canServeLocation, calculateAssignmentScore, calculateDistrictDistance } from './utils/locationUtils';
import { calculateServiceCost } from './utils/pricingUtils';

type AppView = 'landing' | 'login' | 'signup' | 'dashboard';

function App() {
  const [currentAppView, setCurrentAppView] = useState<AppView>('landing');
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false, user: null });
  const [currentView, setCurrentView] = useState('dashboard');
  const [laborers, setLaborers] = useState<Laborer[]>([]);
  const [customerRequests, setCustomerRequests] = useState<CustomerRequest[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ type: 'success' | 'error' | 'waiting'; message: string; assignment?: Assignment }>({ type: 'success', message: '' });
  const [users, setUsers] = useState<User[]>(sampleUsers);

  // Initialize comprehensive laborers list
  useEffect(() => {
    const comprehensiveLaborers = generateComprehensiveLaborers();
    setLaborers(comprehensiveLaborers);
  }, []);

  // Set default view based on user role
  useEffect(() => {
    if (auth.user) {
      switch (auth.user.role) {
        case 'admin':
          setCurrentView('dashboard');
          break;
        case 'customer':
          setCurrentView('request');
          break;
        case 'labour':
          setCurrentView('my-jobs');
          break;
      }
    }
  }, [auth.user]);

  const handleShowLogin = () => {
    setCurrentAppView('login');
  };

  const handleShowSignUp = () => {
    setCurrentAppView('signup');
  };

  const handleBackToLanding = () => {
    setCurrentAppView('landing');
  };

  const handleLogin = (user: User) => {
    setAuth({ isAuthenticated: true, user });
    setCurrentAppView('dashboard');
  };

  const handleSignUp = (userData: any) => {
    // Add new user to users list
    const newUser: User = {
      ...userData,
      id: Date.now()
    };
    setUsers(prev => [...prev, newUser]);

    // If it's a laborer, add to laborers list
    if (userData.role === 'labour') {
      const newLaborer: Laborer = {
        id: newUser.id,
        name: userData.name,
        skill: userData.skill,
        district: userData.district,
        phone: userData.phone,
        experience: userData.experience,
        rating: 4.0,
        available: true,
        userId: newUser.id
      };
      setLaborers(prev => [...prev, newLaborer]);
    }

    // Auto login after signup
    setAuth({ isAuthenticated: true, user: newUser });
    setCurrentAppView('dashboard');
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null });
    setCurrentView('dashboard');
    setCurrentAppView('landing');
  };

  const handleCustomerRequest = async (requestData: Omit<CustomerRequest, 'id' | 'timestamp' | 'status'>) => {
    const newRequest: CustomerRequest = {
      id: Date.now(),
      ...requestData,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };

    setCustomerRequests(prev => [...prev, newRequest]);

    // Show waiting message first
    setModalContent({
      type: 'waiting',
      message: `Thank you for your request! We are searching for the best ${requestData.laborType} in ${requestData.district} and nearby areas. Please wait while we assign a worker to your job.`,
    });
    setShowModal(true);

    // Simulate search time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Find matching laborers with location-based priority
    const matchingLaborers = laborers.filter(laborer => 
      laborer.skill.toLowerCase().includes(requestData.laborType.toLowerCase()) &&
      canServeLocation(laborer.district, requestData.district) &&
      laborer.available
    );

    if (matchingLaborers.length > 0) {
      // Sort by assignment score (distance, rating, availability)
      const sortedLaborers = matchingLaborers
        .map(laborer => ({
          laborer,
          score: calculateAssignmentScore(laborer, requestData.district, requestData.urgency)
        }))
        .sort((a, b) => b.score - a.score);

      const bestMatch = sortedLaborers[0].laborer;
      const distance = calculateDistrictDistance(bestMatch.district, requestData.district);
      
      // Calculate actual cost with distance
      const actualCost = calculateServiceCost(
        requestData.laborType,
        4, // Default duration
        requestData.urgency || 'normal',
        distance * 25, // Approximate km per district
        0, // Material cost
        requestData.extraWorkTypes
      );
      
      const newAssignment: Assignment = {
        id: Date.now(),
        customer: { ...newRequest, actualCost },
        laborer: bestMatch,
        assignedAt: new Date().toISOString(),
        status: 'pending',
        earnings: actualCost * 0.8, // 80% goes to laborer
        distance: distance * 25,
        travelTime: distance * 30 // Approximate minutes
      };
      
      setAssignments(prev => [...prev, newAssignment]);
      setLaborers(prev => prev.map(lab => 
        lab.id === bestMatch.id ? { ...lab, available: false } : lab
      ));
      
      // Update request status
      setCustomerRequests(prev => prev.map(req => 
        req.id === newRequest.id ? { ...req, status: 'assigned', assignedLaborerId: bestMatch.id, actualCost } : req
      ));
      
      const distanceText = distance === 0 ? 'in your district' : 
                          distance === 1 ? 'from a nearby district' : 
                          'from a neighboring area';
      
      setModalContent({
        type: 'success',
        message: `Excellent! We found the perfect worker for you. ${bestMatch.name} (${bestMatch.rating}★) ${distanceText} has been assigned to your job and will contact you shortly. Estimated cost: ₹${actualCost.toLocaleString()}`,
        assignment: newAssignment,
      });
    } else {
      setModalContent({
        type: 'error',
        message: `We're sorry, but no ${requestData.laborType} is currently available in ${requestData.district} or nearby areas. We've added your request to our priority list and will notify you as soon as a worker becomes available.`,
      });
    }
  };

  const handleRateJob = (requestId: number, rating: number, feedback: string) => {
    setCustomerRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, rating, feedback } : req
    ));
  };

  const handleUpdateJobStatus = (assignmentId: number, status: 'completed' | 'cancelled') => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, status } : assignment
    ));
    
    // Update laborer availability if job is completed or cancelled
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      setLaborers(prev => prev.map(lab => 
        lab.id === assignment.laborer.id ? { ...lab, available: true } : lab
      ));
      
      // Update customer request status
      setCustomerRequests(prev => prev.map(req => 
        req.id === assignment.customer.id ? { ...req, status } : req
      ));
    }
  };

  const handleUpdateLaborer = (updatedLaborer: Laborer) => {
    setLaborers(prev => prev.map(lab => 
      lab.id === updatedLaborer.id ? updatedLaborer : lab
    ));
  };

  const handleDeleteLaborer = (laborerId: number) => {
    setLaborers(prev => prev.filter(lab => lab.id !== laborerId));
  };

  const handleAddLaborer = (laborerData: Omit<Laborer, 'id'>) => {
    const newLaborer: Laborer = {
      ...laborerData,
      id: Date.now(),
    };
    setLaborers(prev => [...prev, newLaborer]);
  };

  const handleUpdateRequestStatus = (requestId: number, status: CustomerRequest['status']) => {
    setCustomerRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status } : req
    ));
  };

  const handleAssignJob = (requestId: number, laborerId: number) => {
    const request = customerRequests.find(r => r.id === requestId);
    const laborer = laborers.find(l => l.id === laborerId);
    
    if (request && laborer) {
      const distance = calculateDistrictDistance(laborer.district, request.district);
      const actualCost = calculateServiceCost(
        request.laborType,
        4,
        request.urgency || 'normal',
        distance * 25,
        0,
        request.extraWorkTypes
      );

      const newAssignment: Assignment = {
        id: Date.now(),
        customer: { ...request, actualCost },
        laborer: laborer,
        assignedAt: new Date().toISOString(),
        status: 'pending',
        earnings: actualCost * 0.8,
        distance: distance * 25,
        travelTime: distance * 30
      };
      
      setAssignments(prev => [...prev, newAssignment]);
      setLaborers(prev => prev.map(lab => 
        lab.id === laborerId ? { ...lab, available: false } : lab
      ));
      setCustomerRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: 'assigned', assignedLaborerId: laborerId, actualCost } : req
      ));
    }
  };

  const getCustomerRequests = () => {
    if (auth.user?.role === 'customer') {
      return customerRequests.filter(req => req.customerId === auth.user.id);
    }
    return customerRequests;
  };

  const getLaborerAssignments = () => {
    if (auth.user?.role === 'labour') {
      return assignments.filter(assignment => assignment.laborer.userId === auth.user.id);
    }
    return assignments;
  };

  const renderContent = () => {
    if (!auth.user) return null;

    switch (auth.user.role) {
      case 'customer':
        switch (currentView) {
          case 'request':
            return (
              <RequestForm
                onSubmit={handleCustomerRequest}
                customerId={auth.user.id}
                customerName={auth.user.name}
              />
            );
          case 'my-requests':
            return (
              <MyRequests
                requests={getCustomerRequests()}
                laborers={laborers}
                onRateJob={handleRateJob}
              />
            );
          case 'job-types':
            return <JobTypes />;
          case 'rate-jobs':
            return (
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Rate Completed Jobs</h1>
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <p className="text-slate-600">Rate jobs feature will be available here.</p>
                </div>
              </div>
            );
          case 'about':
            return (
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">About LaborLink</h1>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <p className="text-slate-600 leading-relaxed">
                    LaborLink is Tamil Nadu's premier platform for connecting customers with skilled professionals. 
                    We provide reliable, verified workers across all districts for various home and commercial services.
                  </p>
                </div>
              </div>
            );
          case 'support':
            return (
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Support</h1>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <p className="text-slate-600">Contact us at support@laborlink.com or call +91-9876543210</p>
                </div>
              </div>
            );
          default:
            return (
              <RequestForm
                onSubmit={handleCustomerRequest}
                customerId={auth.user.id}
                customerName={auth.user.name}
              />
            );
        }

      case 'labour':
        switch (currentView) {
          case 'my-jobs':
            return (
              <MyJobs
                assignments={getLaborerAssignments()}
                onUpdateJobStatus={handleUpdateJobStatus}
              />
            );
          case 'personal-details':
            const currentLaborer = laborers.find(l => l.userId === auth.user.id);
            return (
              <PersonalDetails
                laborer={currentLaborer}
                onUpdateProfile={(updatedData) => {
                  if (currentLaborer) {
                    handleUpdateLaborer({ ...currentLaborer, ...updatedData });
                  }
                }}
              />
            );
          case 'earnings':
            return <Earnings assignments={getLaborerAssignments()} />;
          case 'customer-info':
            return <CustomerInfo assignments={getLaborerAssignments()} />;
          case 'schedule':
            return <Schedule assignments={getLaborerAssignments()} />;
          case 'support':
            return (
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Support</h1>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <p className="text-slate-600">Contact us at support@laborlink.com or call +91-9876543210</p>
                </div>
              </div>
            );
          default:
            return (
              <MyJobs
                assignments={getLaborerAssignments()}
                onUpdateJobStatus={handleUpdateJobStatus}
              />
            );
        }

      case 'admin':
        switch (currentView) {
          case 'laborers':
            return (
              <LaborersList
                laborers={laborers}
                onUpdateLaborer={handleUpdateLaborer}
                onDeleteLaborer={handleDeleteLaborer}
                onAddLaborer={handleAddLaborer}
              />
            );
          case 'requests':
            return (
              <RequestsList
                requests={customerRequests}
                laborers={laborers}
                onUpdateRequestStatus={handleUpdateRequestStatus}
              />
            );
          case 'assignments':
            return (
              <AssignJobs
                requests={customerRequests}
                laborers={laborers}
                onAssignJob={handleAssignJob}
              />
            );
          default:
            return (
              <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Laborers</h3>
                    <p className="text-3xl font-bold text-blue-600">{laborers.length}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Available: {laborers.filter(l => l.available).length}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Requests</h3>
                    <p className="text-3xl font-bold text-emerald-600">{customerRequests.length}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      Pending: {customerRequests.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Active Assignments</h3>
                    <p className="text-3xl font-bold text-orange-600">{assignments.length}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      In Progress: {assignments.filter(a => a.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Revenue</h3>
                    <p className="text-3xl font-bold text-purple-600">
                      ₹{assignments.reduce((sum, a) => sum + ((a.customer.actualCost || 0) * 0.2), 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">Platform Fee (20%)</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Requests</h2>
                  {customerRequests.length === 0 ? (
                    <p className="text-slate-600">No requests yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {customerRequests.slice(-5).map(request => (
                        <div key={request.id} className="border border-slate-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-slate-900">{request.customerName}</h3>
                              <p className="text-sm text-slate-600">{request.laborType} in {request.district}</p>
                              {request.actualCost && (
                                <p className="text-sm text-emerald-600 font-medium">₹{request.actualCost.toLocaleString()}</p>
                              )}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                              request.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {request.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
        }

      default:
        return null;
    }
  };

  // Render based on current app view
  if (currentAppView === 'landing') {
    return (
      <div id="home">
        <PublicNavigation onShowLogin={handleShowLogin} onShowSignUp={handleShowSignUp} />
        <LandingPage onShowLogin={handleShowLogin} onShowSignUp={handleShowSignUp} />
      </div>
    );
  }

  if (currentAppView === 'login') {
    return <LoginForm onLogin={handleLogin} users={users} onBackToLanding={handleBackToLanding} />;
  }

  if (currentAppView === 'signup') {
    return <SignUpForm onSignUp={handleSignUp} onBackToLogin={handleShowLogin} />;
  }

  // Dashboard view (authenticated)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation
        user={auth.user!}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />

      {renderContent()}

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="text-center">
              {modalContent.type === 'success' ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : modalContent.type === 'waiting' ? (
                <div className="relative">
                  <Clock className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </div>
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {modalContent.type === 'success' ? 'Worker Assigned!' : 
                 modalContent.type === 'waiting' ? 'Searching for Worker...' : 
                 'Request Received'}
              </h3>
              
              <p className="text-slate-600 mb-4">{modalContent.message}</p>
              
              {modalContent.assignment && (
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-900">{modalContent.assignment.laborer.name}</p>
                        <p className="text-sm text-slate-600">{modalContent.assignment.laborer.skill}</p>
                        <div className="flex items-center text-sm text-slate-600 mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {modalContent.assignment.laborer.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-slate-600">{modalContent.assignment.laborer.rating}</span>
                      </div>
                      <p className="text-xs text-slate-500">{modalContent.assignment.laborer.experience}</p>
                      {modalContent.assignment.distance && (
                        <p className="text-xs text-slate-500">{Math.round(modalContent.assignment.distance)}km away</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {modalContent.type !== 'waiting' && (
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
                >
                  {modalContent.type === 'success' ? 'Great!' : 'Understood'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;