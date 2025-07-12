import React, { useState } from 'react';
import { Menu, X, Briefcase, LogIn } from 'lucide-react';

interface PublicNavigationProps {
  onShowLogin: () => void;
  onShowSignUp: () => void;
}

export const PublicNavigation: React.FC<PublicNavigationProps> = ({ onShowLogin, onShowSignUp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">LaborLink</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onShowLogin}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Find Workers
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Contact
              </button>
              
              <div className="border-t border-slate-200 pt-4 mt-4">
                <button
                  onClick={() => {
                    onShowLogin();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    onShowSignUp();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};