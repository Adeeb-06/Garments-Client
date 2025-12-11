import React from 'react';
import { ShieldX, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  bg-primary flex items-center justify-center p-4">
      <div className=" flex justify-center w-full">
        <div className="bg-white rounded-2xl shadow-xl w-[70%] p-8 border border-base-300 text-center">

          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <ShieldX className="w-12 h-12 text-red-600" />
          </div>

          <div className="mb-4">
            <span className="text-6xl font-bold text-base-200">403</span>
          </div>

          <h1 className="text-2xl font-bold text-secondary mb-3">Access Denied</h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            You are not authorized to view this page. Please contact your administrator if you believe this is an error.
          </p>

          <Link
            to={'/'}
            className="w-full bg-primary text-secondary py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </Link>

        </div>
      </div>
    </div>
  );
}
