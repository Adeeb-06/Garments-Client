import React, { useContext, useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function DeleteModal({isOpen , onClose , product}) {

const {handleSubmit , formState: { errors }} = useForm();
const {user} = useContext(AuthContext);

  const onsubmit = async () => {
    try {
      const res = await api.post(`/product/delete/${product._id}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      },{withCredentials: true});
      console.log(res)
      if(res.status === 200){
        toast.success("Product deleted successfully!");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
        >
          Open Delete Modal
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-secondary">Delete Product</h2>
          </div>
          <button
            onClick={onclose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Warning Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Warning Message */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Are you sure you want to delete this product?
            </h3>
            <p className="text-gray-600 text-sm">
              This action cannot be undone. The product will be permanently removed from your inventory.
            </p>
          </div>

        

          {/* Confirmation Checkbox */}

        </div>
<form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-semibold"
          >
            Cancel
          </button>
          <button
           type='submit'
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold flex items-center space-x-2 shadow-lg"
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete Product</span>
          </button>
        </div>
</form>
        {/* Footer */}
      </div>
    </div>
  );
}