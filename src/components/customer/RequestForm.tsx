import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Briefcase, Home, Plus, ArrowRight, Clock, DollarSign, Info } from 'lucide-react';
import { tamilNaduDistricts, laborTypes, extraWorkTypes, serviceCategories } from '../../data/districts';
import { CustomerRequest } from '../../types';
import { calculateServiceCost, getPricingBreakdown, getEstimatedServiceTime, getServiceAvailability } from '../../utils/pricingUtils';

interface RequestFormProps {
  onSubmit: (request: Omit<CustomerRequest, 'id' | 'timestamp' | 'status'>) => void;
  customerId: number;
  customerName: string;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, customerId, customerName }) => {
  const [loading, setLoading] = useState(false);
  const [selectedExtraWork, setSelectedExtraWork] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLaborType, setSelectedLaborType] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [estimatedDuration, setEstimatedDuration] = useState<number>(4);
  const [materialCost, setMaterialCost] = useState<number>(0);
  const [showPricing, setShowPricing] = useState(false);

  const filteredLaborTypes = selectedCategory 
    ? serviceCategories[selectedCategory as keyof typeof serviceCategories] || []
    : laborTypes;

  const estimatedCost = selectedLaborType ? calculateServiceCost(
    selectedLaborType,
    estimatedDuration,
    urgency,
    0, // Distance will be calculated during assignment
    materialCost,
    selectedExtraWork
  ) : 0;

  const pricingBreakdown = selectedLaborType ? getPricingBreakdown(
    selectedLaborType,
    estimatedDuration,
    urgency,
    0,
    materialCost,
    selectedExtraWork
  ) : null;

  const estimatedTime = selectedLaborType ? getEstimatedServiceTime(selectedLaborType, selectedExtraWork) : '';
  const availability = getServiceAvailability(urgency);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const requestData = {
      customerId,
      customerName,
      phone: formData.get('phone') as string,
      district: selectedDistrict,
      address: formData.get('address') as string,
      laborType: selectedLaborType,
      extraWorkTypes: selectedExtraWork,
      urgency,
      preferredTime: formData.get('preferredTime') as string,
      estimatedCost,
      workDescription: formData.get('workDescription') as string,
      customerLocation: {
        landmark: formData.get('landmark') as string
      }
    };

    onSubmit(requestData);
    setLoading(false);
    
    // Reset form
    (e.target as HTMLFormElement).reset();
    setSelectedExtraWork([]);
    setSelectedCategory('');
    setSelectedLaborType('');
    setSelectedDistrict('');
    setUrgency('normal');
    setEstimatedDuration(4);
    setMaterialCost(0);
  };

  const toggleExtraWork = (workType: string) => {
    setSelectedExtraWork(prev => 
      prev.includes(workType) 
        ? prev.filter(w => w !== workType)
        : [...prev, workType]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Professional</span>
        </h1>
        <p className="text-xl text-slate-600">Get matched with verified professionals in your area with transparent pricing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="+91-9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-2">
                      District *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <select
                        id="district"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select your district</option>
                        {tamilNaduDistricts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Location Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                      Detailed Address *
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Enter your complete address with door number, street, area"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="landmark" className="block text-sm font-medium text-slate-700 mb-2">
                      Nearby Landmark
                    </label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Near City Mall, Opposite Bus Stand"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Selection</h3>
                
                {/* Service Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Service Category (Optional - for easier selection)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(serviceCategories).map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category === selectedCategory ? '' : category);
                          setSelectedLaborType('');
                        }}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          selectedCategory === category
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Service */}
                <div className="mb-6">
                  <label htmlFor="laborType" className="block text-sm font-medium text-slate-700 mb-2">
                    Primary Service Required *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <select
                      id="laborType"
                      value={selectedLaborType}
                      onChange={(e) => setSelectedLaborType(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select primary service</option>
                      {filteredLaborTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Work Description */}
                <div className="mb-6">
                  <label htmlFor="workDescription" className="block text-sm font-medium text-slate-700 mb-2">
                    Work Description *
                  </label>
                  <textarea
                    id="workDescription"
                    name="workDescription"
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Describe the work you need done in detail..."
                  />
                </div>

                {/* Additional Services */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Additional Services (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                    {extraWorkTypes.map(workType => (
                      <button
                        key={workType}
                        type="button"
                        onClick={() => toggleExtraWork(workType)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          selectedExtraWork.includes(workType)
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          <Plus className={`h-4 w-4 ${selectedExtraWork.includes(workType) ? 'rotate-45' : ''} transition-transform duration-200`} />
                          <span className="text-xs">{workType}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedExtraWork.length > 0 && (
                    <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-emerald-700">
                        Selected: {selectedExtraWork.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Urgency Level *
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'normal', label: 'Normal', desc: 'Within 24 hours' },
                        { value: 'urgent', label: 'Urgent', desc: 'Within 4 hours (+30% cost)' },
                        { value: 'emergency', label: 'Emergency', desc: 'Immediate (+50% cost)' }
                      ].map(option => (
                        <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                          <input
                            type="radio"
                            name="urgency"
                            value={option.value}
                            checked={urgency === option.value}
                            onChange={(e) => setUrgency(e.target.value as any)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <p className="font-medium text-slate-900">{option.label}</p>
                            <p className="text-sm text-slate-600">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-700 mb-2">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        type="datetime-local"
                        id="preferredTime"
                        name="preferredTime"
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimated Duration and Material Cost */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">
                      Estimated Duration (hours)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      min="1"
                      max="12"
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="materialCost" className="block text-sm font-medium text-slate-700 mb-2">
                      Expected Material Cost (₹)
                    </label>
                    <input
                      type="number"
                      id="materialCost"
                      min="0"
                      value={materialCost}
                      onChange={(e) => setMaterialCost(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
              Cost Estimate
            </h3>

            {selectedLaborType ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">₹{estimatedCost.toLocaleString()}</p>
                    <p className="text-sm text-slate-600">Estimated Total</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Duration: {estimatedTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Info className="h-4 w-4 mr-2" />
                    <span>{availability}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPricing(!showPricing)}
                  className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  {showPricing ? 'Hide' : 'Show'} Price Breakdown
                </button>

                {showPricing && pricingBreakdown && (
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Base Service:</span>
                      <span className="font-medium">₹{pricingBreakdown.baseService}</span>
                    </div>
                    {pricingBreakdown.additionalHours > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Additional Hours:</span>
                        <span className="font-medium">₹{pricingBreakdown.additionalHours}</span>
                      </div>
                    )}
                    {pricingBreakdown.urgencyCharge > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Urgency Charge:</span>
                        <span className="font-medium">₹{pricingBreakdown.urgencyCharge}</span>
                      </div>
                    )}
                    {pricingBreakdown.extraServices > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Extra Services:</span>
                        <span className="font-medium">₹{pricingBreakdown.extraServices}</span>
                      </div>
                    )}
                    {pricingBreakdown.materialCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Materials:</span>
                        <span className="font-medium">₹{pricingBreakdown.materialCost}</span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>₹{pricingBreakdown.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    <strong>Note:</strong> Final cost may vary based on actual work complexity and materials used. Travel charges may apply for distant locations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600">Select a service to see cost estimate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};