import React from 'react';
import { Zap, Wrench, Hammer, Paintbrush, Sparkles, ChefHat, Car, Leaf, ToyBrick as Brick, Flame, Snowflake, Settings } from 'lucide-react';
import { laborTypes } from '../../data/districts';

export const JobTypes: React.FC = () => {
  const getJobIcon = (jobType: string) => {
    switch (jobType.toLowerCase()) {
      case 'electrician':
        return <Zap className="h-8 w-8" />;
      case 'plumber':
        return <Wrench className="h-8 w-8" />;
      case 'carpenter':
        return <Hammer className="h-8 w-8" />;
      case 'painter':
        return <Paintbrush className="h-8 w-8" />;
      case 'cleaner':
        return <Sparkles className="h-8 w-8" />;
      case 'cook':
        return <ChefHat className="h-8 w-8" />;
      case 'mechanic':
        return <Car className="h-8 w-8" />;
      case 'gardener':
        return <Leaf className="h-8 w-8" />;
      case 'mason':
        return <Brick className="h-8 w-8" />;
      case 'welder':
        return <Flame className="h-8 w-8" />;
      case 'ac technician':
        return <Snowflake className="h-8 w-8" />;
      default:
        return <Settings className="h-8 w-8" />;
    }
  };

  const getJobDescription = (jobType: string) => {
    const descriptions: { [key: string]: string } = {
      'Electrician': 'Electrical installations, repairs, wiring, and maintenance services',
      'Plumber': 'Pipe repairs, installations, drainage, and water system maintenance',
      'Carpenter': 'Furniture making, repairs, wooden installations, and carpentry work',
      'Painter': 'Interior and exterior painting, wall treatments, and decorative work',
      'Cleaner': 'House cleaning, deep cleaning, and maintenance services',
      'Cook': 'Meal preparation, catering, and kitchen assistance services',
      'Mechanic': 'Vehicle repairs, maintenance, and automotive services',
      'Gardener': 'Garden maintenance, landscaping, and plant care services',
      'Mason': 'Construction work, brickwork, and masonry services',
      'Welder': 'Metal joining, fabrication, and welding services',
      'AC Technician': 'Air conditioning installation, repair, and maintenance',
      'Home Appliance Repair': 'Repair and maintenance of household appliances'
    };
    return descriptions[jobType] || 'Professional services and maintenance';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Job Types</span>
        </h1>
        <p className="text-xl text-slate-600">Explore our wide range of professional services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {laborTypes.map((jobType, index) => (
          <div
            key={jobType}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  {getJobIcon(jobType)}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{jobType}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{getJobDescription(jobType)}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                  Request Service →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Need a Custom Service?</h2>
        <p className="text-slate-600 mb-6">
          Don't see what you're looking for? Contact us and we'll help you find the right professional for your specific needs.
        </p>
        <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105">
          Contact Support
        </button>
      </div>
    </div>
  );
};