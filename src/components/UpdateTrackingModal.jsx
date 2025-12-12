import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { ManagerContext } from "../context/ManagerContext";
import { BuyerContext } from "../context/BuyerContext";

const UpdateTrackingModal = ({ isOpen, onClose, order, refetchOrders }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);

  if (!isOpen) return null;


  const trackingStatuses = [
    "Cutting Completed",
    "Sewing Started",
    "Finishing",
    "QC Checked",
    "Packed",
    "Shipped",
    "Out for Delivery",
  ];

  console.log(order)

  const onsubmit = async (data) => {
    const res = await api.patch(`/tracking-order/${order._id}`, data, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    });
    if (res.status === 200) {
      toast.success("Tracking Status Updated!");
      onClose();
      refetchOrders();
    }

  };
  console.log(order ,"asfldj")

  const lastTracking = order?.tracking?.[order.tracking.length - 1] || {};


  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-fu max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Update Tracking Status</h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Status</legend>
            <select  defaultValue={lastTracking.status || ""} className="select" {...register("status")}>
              {trackingStatuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </fieldset>

          {/* Location */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Location</legend>
            <input
              {...register("location")}
              type="text"
              defaultValue={lastTracking.location || ""}
              className="input"
              placeholder="Type here"
            />
          </fieldset>

          {/* Tracking Status */}

          {/* Buttons */}
          <div className="flex justify-center mt-5 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTrackingModal;
