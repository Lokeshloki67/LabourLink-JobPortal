import React, { useState } from 'react';
import { User, Phone, MapPin, Calendar, Briefcase, Mail, Edit, Save, X, MessageCircle } from 'lucide-react';
import { Assignment } from '../../types';

interface CustomerInfoProps {
  assignments: Assignment[];
}

interface CustomerProfile {
  customerId: number;
  customerName: string;
  phone: string;
  email?: string;
  district: string;
  address: string;
  totalJobs: number;
  lastJobDate: string;
  averageRating?: number;
  preferredServices: string[];
  notes?: string;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ assignments }) => {
  const [editingCustomer, setEditingCustomer] = useState<number | null>(null);
  const [customerNotes, setCustomerNotes] = useState<{ [key: number]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique customers with comprehensive details
  const getCustomerProfiles = (): CustomerProfile[] => {
    const customerMap = new Map<number, CustomerProfile>();

    assignments.forEach(assignment => {
      const customerId = assignment.customer.customerId;
      
      if (!customerMap.has(customerId)) {
        const customerAssignments = assignments.filter(a => a.customer.customerId === customerId);
        const services = [...new Set(customerAssignments.map(a => a.customer.laborType))];
        const ratings = customerAssignments
          .map(a => a.customer.rating)
          .filter(r => r !== undefined) as number[];
        
        customerMap.set(customerId, {
          customerId,
          customerName: assignment.customer.customerName,
          phone: assignment.customer.phone,
          email: `${assignment.customer.customerName.toLowerCase().replace(' ', '.')}@email.com`,
          district: assignment.customer.district,
          address: assignment.customer.address,
          totalJobs: customerAssignments.length,
          lastJobDate: new Date(Math.max(...customerAssignments.map(a => new Date(a.assignedAt).getTime()))).toLocaleDateString(),
          averageRating: ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : undefined,
          preferredServices: services,
          notes: customerNotes[customerId] || ''
        });
      }
    });

    return Array.from(customerMap.values());
  };

  const customerProfiles = getCustomerProfiles();
  const filteredCustomers = customerProfiles.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveNotes = (customerId: number, notes: string) => {
    setCustomerNotes(prev => ({ ...prev, [customerId]: notes }));
    setEditingCustomer(null);
  };

  const handleCallCustomer = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}...`);
  };

  const handleEmailCustomer = (email: string, name: string) => {
    alert(`Opening email to ${name} at ${email}...`);
  };

  if (customerProfiles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Customer Information</h1>
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <User className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Customers Yet</h3>
            <p className="text-slate-600">You haven't worked with any customers yet. Complete your first job to see customer information here!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Information</h1>
        <p className="text-slate-600">Manage your customer relationships and contact details</p>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{customerProfiles.length}</p>
          <p className="text-sm text-slate-600">Total Customers</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{assignments.length}</p>
          <p className="text-sm text-slate-600">Total Jobs</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">
            {new Set(customerProfiles.map(c => c.district)).size}
          </p>
          <p className="text-sm text-slate-600">Districts Served</p>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <div key={customer.customerId} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{customer.customerName}</h3>
                  <p className="text-sm text-slate-600">ID: #{customer.customerId}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingCustomer(editingCustomer === customer.customerId ? null : customer.customerId)}
                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="h-4 w-4 mr-3 text-slate-400" />
                <span>{customer.phone}</span>
              </div>
              
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="h-4 w-4 mr-3 text-slate-400" />
                <span>{customer.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-slate-600">
                <MapPin className="h-4 w-4 mr-3 text-slate-400" />
                <span>{customer.district}</span>
              </div>
              
              <div className="text-sm text-slate-600">
                <strong className="text-slate-700">Address:</strong>
                <p className="mt-1">{customer.address}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  <Briefcase className="h-4 w-4 inline mr-1" />
                  {customer.totalJobs} jobs
                </span>
                <span className="text-slate-600">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {customer.lastJobDate}
                </span>
              </div>

              {customer.averageRating && (
                <div className="flex items-center text-sm">
                  <span className="text-slate-600 mr-2">Rating:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`text-sm ${star <= customer.averageRating! ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-600 ml-1">({customer.averageRating.toFixed(1)})</span>
                </div>
              )}

              <div className="text-sm">
                <strong className="text-slate-700">Preferred Services:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {customer.preferredServices.map(service => (
                    <span key={service} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="text-sm">
                <strong className="text-slate-700">Notes:</strong>
                {editingCustomer === customer.customerId ? (
                  <div className="mt-2">
                    <textarea
                      value={customerNotes[customer.customerId] || customer.notes || ''}
                      onChange={(e) => setCustomerNotes(prev => ({ ...prev, [customer.customerId]: e.target.value }))}
                      className="w-full p-2 border border-slate-300 rounded text-sm resize-none"
                      rows={3}
                      placeholder="Add notes about this customer..."
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleSaveNotes(customer.customerId, customerNotes[customer.customerId] || '')}
                        className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        <Save className="h-3 w-3" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => setEditingCustomer(null)}
                        className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700"
                      >
                        <X className="h-3 w-3" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 text-slate-600 text-sm">
                    {customer.notes || customerNotes[customer.customerId] || 'No notes added'}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCallCustomer(customer.phone, customer.customerName)}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </button>
              <button
                onClick={() => handleEmailCustomer(customer.email!, customer.customerName)}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Customers Found</h3>
          <p className="text-slate-600">No customers match your search criteria.</p>
        </div>
      )}
    </div>
  );
};