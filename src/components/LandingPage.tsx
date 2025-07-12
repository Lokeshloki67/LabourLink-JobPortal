import React from 'react';
import { Users, Briefcase, MapPin, Star, CheckCircle, Phone, Mail, Clock, Shield, Award, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onShowLogin: () => void;
  onShowSignUp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin, onShowSignUp }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFooterLink = (section: string) => {
    // For now, scroll to relevant sections or show alerts
    switch (section) {
      case 'about':
        scrollToSection('about');
        break;
      case 'how-it-works':
        scrollToSection('how-it-works');
        break;
      case 'contact':
        scrollToSection('contact');
        break;
      case 'privacy':
        alert('Privacy Policy: We protect your personal information and ensure secure transactions.');
        break;
      case 'terms':
        alert('Terms of Service: By using LaborLink, you agree to our terms and conditions.');
        break;
      case 'help':
        alert('Help Center: Contact us at support@laborlink.com or call +91-9876543210 for assistance.');
        break;
      case 'safety':
        alert('Safety: All our workers are verified and background-checked for your security.');
        break;
      case 'community':
        alert('Community: Join our growing community of satisfied customers and skilled professionals.');
        break;
      case 'trust':
        alert('Trust & Safety: We ensure secure payments and verified professionals for your peace of mind.');
        break;
      case 'feedback':
        alert('Feedback: We value your feedback! Email us at feedback@laborlink.com');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white pt-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with Skilled
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Professionals
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Tamil Nadu's premier platform for connecting customers with verified skilled workers across all districts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('services')}
                className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Find Workers
              </button>
              <button 
                onClick={onShowSignUp}
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
              >
                Join as Worker
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-emerald-300 bg-opacity-20 rounded-full animate-ping"></div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose LaborLink?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We make it easy to find reliable, skilled professionals for all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Verified Workers</h3>
              <p className="text-slate-600">All our professionals are background-checked and verified</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">All Districts</h3>
              <p className="text-slate-600">Available across all 38 districts of Tamil Nadu</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Quick Response</h3>
              <p className="text-slate-600">Get matched with workers within minutes of your request</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Quality Assured</h3>
              <p className="text-slate-600">Rated and reviewed by customers for quality assurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600">
              Professional services for all your home and business needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Electrician', icon: '⚡' },
              { name: 'Plumber', icon: '🔧' },
              { name: 'Carpenter', icon: '🔨' },
              { name: 'Painter', icon: '🎨' },
              { name: 'Cleaner', icon: '✨' },
              { name: 'Cook', icon: '👨‍🍳' },
              { name: 'Mechanic', icon: '🔧' },
              { name: 'Gardener', icon: '🌱' },
              { name: 'Mason', icon: '🧱' },
              { name: 'Welder', icon: '🔥' },
              { name: 'AC Tech', icon: '❄️' },
              { name: 'Security', icon: '🛡️' },
              { name: 'Driver', icon: '🚗' },
              { name: 'Tutor', icon: '📚' },
              { name: 'Fitness', icon: '💪' },
              { name: 'Barber', icon: '✂️' },
              { name: 'Tailor', icon: '🧵' },
              { name: 'Catering', icon: '🍽️' }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-semibold text-slate-900">{service.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={onShowLogin}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple steps to get the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Submit Request</h3>
              <p className="text-slate-600">Fill out a simple form with your requirements and location details</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Matched</h3>
              <p className="text-slate-600">Our system finds the best available worker in your area</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Work Done</h3>
              <p className="text-slate-600">Professional completes your work and you rate the service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">500+</span>
              </div>
              <p className="text-blue-100">Verified Workers</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">2000+</span>
              </div>
              <p className="text-blue-100">Jobs Completed</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">38</span>
              </div>
              <p className="text-blue-100">Districts Covered</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 mr-2" />
                <span className="text-4xl font-bold">4.8</span>
              </div>
              <p className="text-blue-100">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4">"Found an excellent electrician within 30 minutes. Professional service and fair pricing!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-medium">R</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Rajesh Kumar</p>
                  <p className="text-sm text-slate-600">Chennai</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4">"Great platform! The plumber was skilled and completed the work perfectly. Highly recommended."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-medium">P</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Priya Sharma</p>
                  <p className="text-sm text-slate-600">Coimbatore</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4">"Easy to use and reliable. Got my carpentry work done by a very experienced professional."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-medium">A</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Arun Krishnan</p>
                  <p className="text-sm text-slate-600">Madurai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-slate-600">
              Have questions? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600">+91-9876543210</p>
              <p className="text-slate-600">Available 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600">support@laborlink.com</p>
              <p className="text-slate-600">Quick response guaranteed</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Visit Us</h3>
              <p className="text-slate-600">123 Business District</p>
              <p className="text-slate-600">Chennai, Tamil Nadu</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={onShowLogin}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Join LaborLink Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">LaborLink</span>
              </div>
              <p className="text-slate-400 mb-4">
                Connecting skilled professionals with customers across Tamil Nadu.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors">
                  <span className="text-xs font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Electrician</li>
                <li className="hover:text-white cursor-pointer transition-colors">Plumber</li>
                <li className="hover:text-white cursor-pointer transition-colors">Carpenter</li>
                <li className="hover:text-white cursor-pointer transition-colors">Painter</li>
                <li className="hover:text-white cursor-pointer transition-colors">And More...</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li 
                  onClick={() => handleFooterLink('about')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  About Us
                </li>
                <li 
                  onClick={() => handleFooterLink('how-it-works')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  How It Works
                </li>
                <li 
                  onClick={() => handleFooterLink('privacy')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Privacy Policy
                </li>
                <li 
                  onClick={() => handleFooterLink('terms')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Terms of Service
                </li>
                <li 
                  onClick={() => handleFooterLink('contact')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Contact
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li 
                  onClick={() => handleFooterLink('help')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Help Center
                </li>
                <li 
                  onClick={() => handleFooterLink('safety')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Safety
                </li>
                <li 
                  onClick={() => handleFooterLink('community')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Community
                </li>
                <li 
                  onClick={() => handleFooterLink('trust')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Trust & Safety
                </li>
                <li 
                  onClick={() => handleFooterLink('feedback')}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Feedback
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 LaborLink. All rights reserved. | Made with ❤️ for Tamil Nadu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};