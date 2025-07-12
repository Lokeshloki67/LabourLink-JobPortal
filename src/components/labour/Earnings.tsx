import React from 'react';
import { DollarSign, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { Assignment } from '../../types';

interface EarningsProps {
  assignments: Assignment[];
}

export const Earnings: React.FC<EarningsProps> = ({ assignments }) => {
  const completedJobs = assignments.filter(assignment => assignment.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, assignment) => sum + (assignment.earnings || 500), 0);
  const thisMonthEarnings = completedJobs
    .filter(assignment => {
      const assignedDate = new Date(assignment.assignedAt);
      const currentDate = new Date();
      return assignedDate.getMonth() === currentDate.getMonth() && 
             assignedDate.getFullYear() === currentDate.getFullYear();
    })
    .reduce((sum, assignment) => sum + (assignment.earnings || 500), 0);

  const averageEarningsPerJob = completedJobs.length > 0 ? totalEarnings / completedJobs.length : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Earnings Dashboard</h1>
        <p className="text-slate-600">Track your income and job performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">₹{totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600">₹{thisMonthEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed Jobs</p>
              <p className="text-2xl font-bold text-emerald-600">{completedJobs.length}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg per Job</p>
              <p className="text-2xl font-bold text-orange-600">₹{Math.round(averageEarningsPerJob)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Earnings History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Earnings History</h2>
        
        {completedJobs.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Earnings Yet</h3>
            <p className="text-slate-600">Complete your first job to start earning!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Job ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Work Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {completedJobs.map(assignment => (
                  <tr key={assignment.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-900">#{assignment.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{assignment.customer.customerName}</p>
                        <p className="text-sm text-slate-600">{assignment.customer.district}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-900">{assignment.customer.laborType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-600">{new Date(assignment.assignedAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-green-600">₹{assignment.earnings || 500}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Payment Information</h3>
        <p className="text-slate-600 mb-4">
          Payments are processed weekly. Your earnings will be transferred to your registered bank account every Friday.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-slate-700">Next Payment Date:</span>
            <span className="ml-2 text-slate-600">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-slate-700">Payment Method:</span>
            <span className="ml-2 text-slate-600">Bank Transfer</span>
          </div>
        </div>
      </div>
    </div>
  );
};