import React, { useContext, useState } from "react";
import { Search, Edit, X } from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { AdminContext } from "../../../context/AdminContext";
import { useForm } from "react-hook-form";
import { TbBatteryCharging } from "react-icons/tb";
import api from "../../../api";
import UnauthorizedPage from "../../../pages/UnauthorizedPage";

export default function UserManagement() {
  const { userData, user } = useContext(AuthContext);
  const { users, isLoading, refetch } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      // console.log(userData.accessToken)
      const res = await api.patch(
        `/admin/user-status/${selectedUser.email}`,
        data,
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      console.log(res);
      refetch();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (userData.role !== "admin") return <p>Not authorized</p>;
  if (isLoading) return <p> Loading...</p>;

 const filteredUsers = users
  .filter(user => user) 
  .filter(
    (user) =>
      (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if(userData?.role == "admin") {
    return (
    <div className="min-h-screen w-[80vw] bg-base-200 p-8">
      <div className=" mx-auto">
        {/* Header with Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                User Management
              </h1>
              <p className="text-gray-600">
                Manage user registrations and status
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-base-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead>
                <tr className="bg-primary text-secondary">
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-base-300">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary text-secondary rounded-full flex items-center justify-center font-bold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                            user.role === "Manager"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleUpdateClick(user)}
                            className="flex items-center space-x-2 bg-primary text-secondary px-4 py-2 rounded-lg hover:opacity-90 transition-all font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Update</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer Info */}
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </div>

      {/* Update Status Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 bg flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-base-300">
              <h2 className="text-2xl font-bold text-primary">
                Update User Status
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary text-secondary rounded-full flex items-center justify-center font-bold text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedUser.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="bg-base-200 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-1">Current Role</p>
                  <p className="font-semibold text-primary">
                    {selectedUser.role}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-1">Current Status</p>
                  <p className="font-semibold text-primary">
                    {selectedUser.status}
                  </p>
                </div>
              </div>

              {/* Status Selection */}
              {/* Status Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-3">
                  Update Status
                </label>
                <form onSubmit={handleSubmit(onsubmit)}>
                  <div className="flex gap-2 mb-4">
                    <label
                      htmlFor="approve"
                      className="w-full bg-green-100 border-2 border-green-300 text-green-800 px-4 py-3 rounded-lg hover:bg-green-200 transition-all font-medium text-left cursor-pointer"
                    >
                      <input
                        type="radio"
                        id="approve"
                        {...register("status")}
                        name="status"
                        value="approve"
                        className="mr-2"
                      />
                      Approve User
                    </label>

                    <label
                      htmlFor="reject"
                      className="w-full bg-red-100 border-2 border-red-300 text-red-800 px-4 py-3 rounded-lg hover:bg-red-200 transition-all font-medium text-left cursor-pointer"
                    >
                      <input
                        type="radio"
                        id="reject"
                        {...register("status")}
                        name="status"
                        value="reject"
                        className="mr-2"
                      />
                      Reject User
                    </label>
                  </div>

                  {/* Modal Footer Buttons */}
                  <div className="flex items-center justify-end space-x-3 p-6 border-t border-base-300">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-secondary rounded-lg hover:opacity-90 transition-all font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
          </div>
        </div>
      )}
    </div>
  );} else{
    return <UnauthorizedPage/>
  }
}
