import React, { useState } from 'react';
import { Menu, X, LogOut, Home, Users, Briefcase, Settings, Star, Phone, Info, DollarSign, Calendar, BarChart3, User as UserIcon } from 'lucide-react';
import type { User } from '../types';

interface NavigationProps {
  user: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, currentView, onViewChange, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getMenuItems = () => {
    switch (user.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'laborers', label: 'Labour List', icon: Users },
          { id: 'requests', label: 'Requests', icon: Briefcase },
          { id: 'assignments', label: 'Assign Jobs', icon: Settings },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
        ];
      case 'customer':
        return [
          { id: 'request', label: 'Request Labour', icon: Briefcase },
          { id: 'my-requests', label: 'My Requests', icon: Users },
          { id: 'job-types', label: 'Job Types', icon: Settings },
          { id: 'rate-jobs', label: 'Rate Jobs', icon: Star },
          { id: 'about', label: 'About', icon: Info },
          { id: 'support', label: 'Support', icon: Phone },
        ];
      case 'labour':
        return [
          { id: 'my-jobs', label: 'My Jobs', icon: Briefcase },
          { id: 'personal-details', label: 'Personal Details', icon: UserIcon },
          { id: 'earnings', label: 'Earnings', icon: DollarSign },
          { id: 'customer-info', label: 'Customer Info', icon: Users },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'support', label: 'Support', icon: Phone },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">LaborLink</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium text-slate-700">{user.name}</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full capitalize">{user.role}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex items-center space-x-3 px-4 py-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">{user.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-600 capitalize">{user.role}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};