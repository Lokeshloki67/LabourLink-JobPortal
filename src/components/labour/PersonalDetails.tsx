import React, { useState } from 'react';
import { User, Phone, MapPin, Briefcase, Mail, Edit, Save, X, Star, Calendar, Award, Clock, Shield, Camera, FileText } from 'lucide-react';
import { Laborer } from '../../types';

interface PersonalDetailsProps {
  laborer?: Laborer;
  onUpdateProfile?: (updatedData: Partial<Laborer>) => void;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ laborer, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: laborer?.name || 'John Smith',
    phone: laborer?.phone || '+91-9876543210',
    email: 'john.smith@email.com',
    district: laborer?.district || 'Chennai',
    address: '123 Main Street, T. Nagar, Chennai - 600017',
    skill: laborer?.skill || 'Electrician',
    experience: laborer?.experience || '5 years',
    rating: laborer?.rating || 4.8,
    specializations: laborer?.specializations || ['Residential Wiring', 'Commercial Installation', 'Emergency Repairs'],
    certifications: laborer?.certifications || ['ITI Electrician', 'Safety Training Certificate'],
    languages: laborer?.languages || ['Tamil', 'English', 'Hindi'],
    workingHours: laborer?.workingHours || '8:00 AM - 6:00 PM',
    emergencyAvailable: laborer?.emergencyAvailable || true,
    bio: 'Experienced electrician with 5+ years in residential and commercial electrical work. Specialized in modern wiring systems and emergency repairs.',
    bankAccount: '1234567890',
    ifscCode: 'HDFC0001234',
    panNumber: 'ABCDE1234F',
    aadharNumber: '1234-5678-9012',
    joiningDate: '2020-01-15'
  });

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(editData);
    }
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      name: laborer?.name || 'John Smith',
      phone: laborer?.phone || '+91-9876543210',
      email: 'john.smith@email.com',
      district: laborer?.district || 'Chennai',
      address: '123 Main Street, T. Nagar, Chennai - 600017',
      skill: laborer?.skill || 'Electrician',
      experience: laborer?.experience || '5 years',
      rating: laborer?.rating || 4.8,
      specializations: laborer?.specializations || ['Residential Wiring', 'Commercial Installation', 'Emergency Repairs'],
      certifications: laborer?.certifications || ['ITI Electrician', 'Safety Training Certificate'],
      languages: laborer?.languages || ['Tamil', 'English', 'Hindi'],
      workingHours: laborer?.workingHours || '8:00 AM - 6:00 PM',
      emergencyAvailable: laborer?.emergencyAvailable || true,
      bio: 'Experienced electrician with 5+ years in residential and commercial electrical work. Specialized in modern wiring systems and emergency repairs.',
      bankAccount: '1234567890',
      ifscCode: 'HDFC0001234',
      panNumber: 'ABCDE1234F',
      aadharNumber: '1234-5678-9012',
      joiningDate: '2020-01-15'
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setEditData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Personal Details</h1>
            <p className="text-slate-600">Manage your profile information and professional details</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <User className="h-12 w-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="h-4 w-4 text-slate-600" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-1">{editData.name}</h2>
            <p className="text-slate-600 mb-2">{editData.skill}</p>
            
            <div className="flex items-center justify-center space-x-1 mb-4">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium text-slate-900">{editData.rating}</span>
              <span className="text-slate-600 text-sm">(4.8/5.0)</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{editData.district}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Briefcase className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">{editData.experience} experience</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">Joined {new Date(editData.joiningDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                laborer?.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  laborer?.available ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                {laborer?.available ? 'Available' : 'Busy'}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">District</label>
                {isEditing ? (
                  <select
                    value={editData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Salem">Salem</option>
                    <option value="Erode">Erode</option>
                  </select>
                ) : (
                  <p className="text-slate-900">{editData.district}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <p className="text-slate-900">{editData.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <p className="text-slate-900">{editData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-emerald-600" />
              Professional Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Skill</label>
                {isEditing ? (
                  <select
                    value={editData.skill}
                    onChange={(e) => handleInputChange('skill', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Painter">Painter</option>
                    <option value="AC Technician">AC Technician</option>
                  </select>
                ) : (
                  <p className="text-slate-900">{editData.skill}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.experience}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Working Hours</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.workingHours}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Emergency Available</label>
                {isEditing ? (
                  <select
                    value={editData.emergencyAvailable ? 'yes' : 'no'}
                    onChange={(e) => handleInputChange('emergencyAvailable', e.target.value === 'yes')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                ) : (
                  <p className="text-slate-900">{editData.emergencyAvailable ? 'Yes' : 'No'}</p>
                )}
              </div>

              {/* Specializations */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Specializations</label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editData.specializations.map((spec, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleArrayChange('specializations', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeArrayItem('specializations', index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('specializations')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Specialization
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {editData.specializations.map(spec => (
                      <span key={spec} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Certifications</label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editData.certifications.map((cert, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeArrayItem('certifications', index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('certifications')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Certification
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {editData.certifications.map(cert => (
                      <span key={cert} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                        <Award className="h-3 w-3 inline mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Languages</label>
                {isEditing ? (
                  <div className="space-y-2">
                    {editData.languages.map((lang, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={lang}
                          onChange={(e) => handleArrayChange('languages', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => removeArrayItem('languages', index)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('languages')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Language
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {editData.languages.map(lang => (
                      <span key={lang} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-purple-600" />
              Financial & Identity Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bank Account Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.bankAccount}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">****{editData.bankAccount.slice(-4)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">IFSC Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.ifscCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">PAN Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">{editData.panNumber.slice(0, 5)}****{editData.panNumber.slice(-1)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Aadhar Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-slate-900">****-****-{editData.aadharNumber.slice(-4)}</p>
                )}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600" />
              Documents
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-2">Profile Photo</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Upload Photo
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-2">ID Proof</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Upload Document
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-2">Certificates</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Upload Certificates
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-2">Work Samples</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Upload Photos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};