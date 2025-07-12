import React, { useState } from 'react';
import { User, LogIn, Lock, ChevronDown, ArrowLeft, UserPlus } from 'lucide-react';
import type { User as UserType } from '../types';

interface LoginFormProps {
  onLogin: (user: UserType) => void;
  users: UserType[];
  onBackToLanding?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, users, onBackToLanding }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'customer' | 'labour'>('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign up form data
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    district: '',
    skill: '',
    experience: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => 
      u.username === username && 
      u.password === password && 
      u.role === selectedRole
    );

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid credentials or role mismatch');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const newUser: UserType = {
      id: Date.now(),
      username: signupData.username,
      password: signupData.password,
      role: selectedRole,
      name: signupData.name,
      phone: signupData.phone,
      ...(selectedRole === 'labour' && {
        district: signupData.district,
        skill: signupData.skill,
        experience: signupData.experience,
        rating: 4.0
      })
    };

    onLogin(newUser);
    setLoading(false);
  };

  const demoCredentials = {
    admin: { username: 'admin', password: 'admin123' },
    customer: { username: 'customer1', password: 'pass123' },
    labour: { username: 'john_electrician', password: 'pass123' }
  };

  const fillDemoCredentials = (role: 'admin' | 'customer' | 'labour') => {
    setUsername(demoCredentials[role].username);
    setPassword(demoCredentials[role].password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Home Button - Top Right */}
        {onBackToLanding && (
          <div className="flex justify-end mb-4">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center bg-white text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to LaborLink</h1>
          <p className="text-slate-600">
            {mode === 'signin' ? 'Sign in to access your dashboard' : 'Create your account to get started'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Mode Toggle Tabs */}
          <div className="flex">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-200 ${
                mode === 'signin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <LogIn className="h-5 w-5 inline mr-2" />
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-200 ${
                mode === 'signup'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <UserPlus className="h-5 w-5 inline mr-2" />
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {mode === 'signin' ? (
              /* Sign In Form */
              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                    Select Role
                  </label>
                  <div className="relative">
                    <select
                      id="role"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'customer' | 'labour')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="customer">Customer</option>
                      <option value="labour">Labour</option>
                      <option value="admin">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-3">Demo Credentials:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('admin')}
                      className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('customer')}
                      className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoCredentials('labour')}
                      className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
                    >
                      Labour
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    I want to join as *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('customer')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedRole === 'customer'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <User className="h-5 w-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('labour')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedRole === 'labour'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <UserPlus className="h-5 w-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Worker</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={signupData.name}
                    onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Username *"
                    value={signupData.username}
                    onChange={(e) => setSignupData(prev => ({ ...prev, username: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />

                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={signupData.phone}
                  onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />

                {selectedRole === 'labour' && (
                  <>
                    <select
                      value={signupData.district}
                      onChange={(e) => setSignupData(prev => ({ ...prev, district: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select District *</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Salem">Salem</option>
                      <option value="Erode">Erode</option>
                    </select>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={signupData.skill}
                        onChange={(e) => setSignupData(prev => ({ ...prev, skill: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select Skill *</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Painter">Painter</option>
                        <option value="Cleaner">Cleaner</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Experience (e.g., 5 years) *"
                        value={signupData.experience}
                        onChange={(e) => setSignupData(prev => ({ ...prev, experience: e.target.value }))}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="password"
                    placeholder="Password *"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password *"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};