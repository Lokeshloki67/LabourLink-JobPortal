import React, { useState } from 'react';
import { User, Phone, MapPin, Star, Edit, Trash2, Plus, Search } from 'lucide-react';
import { Laborer } from '../../types';

interface LaborersListProps {
  laborers: Laborer[];
  onUpdateLaborer: (laborer: Laborer) => void;
  onDeleteLaborer: (laborerId: number) => void;
  onAddLaborer: (laborer: Omit<Laborer, 'id'>) => void;
}

export const LaborersList: React.FC<LaborersListProps> = ({ 
  laborers, 
  onUpdateLaborer, 
  onDeleteLaborer, 
  onAddLaborer 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLaborer, setEditingLaborer] = useState<Laborer | null>(null);

  const filteredLaborers = laborers.filter(laborer => {
    const matchesSearch = laborer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         laborer.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !filterSkill || laborer.skill === filterSkill;
    const matchesDistrict = !filterDistrict || laborer.district === filterDistrict;
    
    return matchesSearch && matchesSkill && matchesDistrict;
  });

  const uniqueSkills = [...new Set(laborers.map(l => l.skill))];
  const uniqueDistricts = [...new Set(laborers.map(l => l.district))];

  const handleSubmit = (e: React.FormEvent, isEdit: boolean = false) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const laborerData = {
      name: formData.get('name') as string,
      skill: formData.get('skill') as string,
      district: formData.get('district') as string,
      phone: formData.get('phone') as string,
      experience: formData.get('experience') as string,
      rating: parseFloat(formData.get('rating') as string),
      available: formData.get('available') === 'on',
      userId: editingLaborer?.userId || Date.now(),
    };

    if (isEdit && editingLaborer) {
      onUpdateLaborer({ ...laborerData, id: editingLaborer.id });
      setEditingLaborer(null);
    } else {
      onAddLaborer(laborerData);
      setShowAddForm(false);
    }
    
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Laborers Management</h1>
            <p className="text-slate-600">Manage your workforce and their details</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Laborer</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search laborers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Skills</option>
            {uniqueSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Districts</option>
            {uniqueDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          
          <div className="text-sm text-slate-600 flex items-center">
            Showing {filteredLaborers.length} of {laborers.length} laborers
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingLaborer) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {editingLaborer ? 'Edit Laborer' : 'Add New Laborer'}
            </h3>
            <form onSubmit={(e) => handleSubmit(e, !!editingLaborer)} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                defaultValue={editingLaborer?.name || ''}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="skill"
                placeholder="Skill (e.g., Electrician)"
                defaultValue={editingLaborer?.skill || ''}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="district"
                placeholder="District"
                defaultValue={editingLaborer?.district || ''}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                defaultValue={editingLaborer?.phone || ''}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g., 5 years)"
                defaultValue={editingLaborer?.experience || ''}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                step="0.1"
                defaultValue={editingLaborer?.rating || ''}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="available"
                  defaultChecked={editingLaborer?.available ?? true}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Available for work</span>
              </label>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingLaborer ? 'Update' : 'Add'} Laborer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingLaborer(null);
                  }}
                  className="flex-1 bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Laborers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaborers.map(laborer => (
          <div key={laborer.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{laborer.name}</h3>
                  <p className="text-sm text-slate-600">{laborer.skill}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingLaborer(laborer)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteLaborer(laborer.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="h-4 w-4 mr-2" />
                {laborer.phone}
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <MapPin className="h-4 w-4 mr-2" />
                {laborer.district}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{laborer.experience}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-slate-600">{laborer.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                laborer.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {laborer.available ? 'Available' : 'Busy'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredLaborers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Laborers Found</h3>
          <p className="text-slate-600">No laborers match your current filters.</p>
        </div>
      )}
    </div>
  );
};