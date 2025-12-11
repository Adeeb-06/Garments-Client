import React, { useContext } from 'react';
import { User, Mail, Shield, Clock, XCircle, CheckCircle, Edit } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
    const {userData} = useContext(AuthContext);
  // Change status to: 'pending', 'approved', or 'rejected' to see different views
//   const userData = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     role: 'Manager',
//     profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
//     status: 'rejected', // Change this to 'pending', 'approved', or 'rejected'
//     rejectionReason: 'The provided business registration documents were incomplete. Please ensure all required documents are submitted and verify your business email address.'
//   };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approve':
        return {
          icon: CheckCircle,
          label: 'Approved',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200'
        };
      case 'reject':
        return {
          icon: XCircle,
          label: 'Rejected',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
      default: // pending
        return {
          icon: Clock,
          label: 'Pending',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200'
        };
    }
  };

  const statusConfig = getStatusConfig(userData?.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen w-[81vw]  bg-primary p-8">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-secondary mb-2">My Profile</h1>
          <p className="text-gray-600">View and manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Profile Header Section */}
          <div className="bg-gradient-to-r from-secondary to-secondary/80 p-8 text-center relative">
            <div className="relative inline-block">
              <img
                src={userData?.photoURL}
                alt={userData?.name}
                referrerPolicy="no-referrer"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto"
              />
              
            </div>
            <h2 className="text-2xl font-bold text-primary mt-4">{userData?.name}</h2>
            <p className="text-primary/80">{userData?.email}</p>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            {/* Account Status */}
            <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 rounded-xl p-6 mb-6`}>
              <div className="flex items-center space-x-3 mb-2">
                <StatusIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
                <h3 className={`text-lg font-bold ${statusConfig.textColor}`}>
                  Account Status: {statusConfig.label}
                </h3>
              </div>
              
              {userData?.status === 'pending' && (
                <p className="text-yellow-700 text-sm">
                  Your account is currently under review by our administrators. You will be notified once approved.
                </p>
              )}
              
              {userData?.status === 'approve' && (
                <p className="text-green-700 text-sm">
                  Your account has been approved. You now have full access to all features.
                </p>
              )}
              
              {userData?.status === 'reject' && (
                <div>
                  <p className="text-red-700 text-sm font-semibold mb-2">
                    Your account application was rejected for the following reason:
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <p className="text-red-800 text-sm leading-relaxed">
                      {userData?.feedback}
                    </p>
                  </div>
                  
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <User className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-secondary">Full Name</h3>
                </div>
                <p className="text-gray-700 font-medium">{userData?.name}</p>
              </div>

              <div className="bg-primary rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-secondary">Email Address</h3>
                </div>
                <p className="text-gray-700 font-medium">{userData?.email}</p>
              </div>

              <div className="bg-primary rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-secondary">Role</h3>
                </div>
                <p className="text-gray-700 font-medium">{userData?.role}</p>
              </div>

              <div className="bg-primary rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <StatusIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-secondary">Status</h3>
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
           
          </div>
        </div>
      </div>
    </div>
  );
}