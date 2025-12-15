import React, { useContext, useEffect, useState } from "react";
import {
  Package,
  FileText,
  Tag,
  DollarSign,
  Upload,
  CreditCard,
} from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import AccountStatus from "../../AccountStatus";
import UnauthorizedPage from "../../../pages/UnauthorizedPage";
import { useForm } from "react-hook-form";
import api from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [imageList, setImageList] = useState([]);
  const { userData, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadToImgBB = async (imageFile) => {
    const form = new FormData();
    form.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();
    return data.data.url; // image URL
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (formData) => {
      const uploadedUrls = await Promise.all(
        imageList.map((img) => uploadToImgBB(img))
      );

      const finalData = {
        ...formData,
        images: uploadedUrls,
      };

      const res = await api.post("/manager/create-product", finalData, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      return res.data;
    },

    onSuccess: () => {
      navigate("/dashboard/products");
      toast.success("Product created successfully!");
    },

    onError: (err) => {
      console.log("Upload failed:", err);
    },
  });

  const onsubmit = async (data) => {
    mutate(data);
  };

  const categories = ["Men", "Woman", "Kids", "Winter"];
  const paymentOptions = ["Cash on Delivery", "PayFirst"];

  const handleAddFiles = (e) => {
    const files = Array.from(e.target.files);

    setImageList((prev) => [...prev, ...files]); // accumulate
  };

  if (userData?.role == "manager") {
    return (
      <div className="min-h-screen w-[80vw] bg-primary p-8">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Add New Product
            </h1>
            <p className="text-gray-600">
              Fill in the product details to add to inventory
            </p>
          </div>

          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-base-300">
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Product Name / Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register("product_name", {
                        required: {
                          value: true,
                          message: "Product name is required",
                        },
                      })}
                      type="text"
                      placeholder="Enter product name"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Product Description */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      {...register("product_description", {
                        required: {
                          value: true,
                          message: "Product description is required",
                        },
                      })}
                      placeholder="Enter detailed product description..."
                      rows="5"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register("category", {
                        required: {
                          value: true,
                          message: "Category is required",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price, Available Quantity, MOQ - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        {...register("price", {
                          required: {
                            value: true,
                            message: "Price is required",
                          },
                        })}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Available Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Available Quantity <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        {...register("available_quantity", {
                          required: {
                            value: true,
                            message: "Available quantity is required",
                          },
                        })}
                        placeholder="0"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Minimum Order Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Min. Order (MOQ) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        {...register("min_order", {
                          required: {
                            value: true,
                            message: "Min. order is required",
                          },
                        })}
                        placeholder="0"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary transition-all bg-primary">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      <span className="text-secondary font-semibold cursor-pointer hover:underline">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, JPEG up to 10MB (Multiple files allowed)
                    </p>
                    <input
                      type="file"
                      multiple
                      {...register("images", {
                        required: {
                          value: true,
                          message: "Images are required",
                        },
                      })}
                      onChange={handleAddFiles}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="inline-block mt-4 px-6 py-2 bg-primary text-secondary rounded-lg font-medium cursor-pointer hover:opacity-90 transition-all"
                    >
                      Browse Files
                    </label>
                  </div>
                  <div className="flex items-center gap-4 justify-center">
                    {imageList &&
                      imageList.length > 0 &&
                      Array.from(imageList).map((image, index) => (
                        <img
                          src={URL.createObjectURL(image)}
                          key={index}
                          alt="Product Image"
                          className="w-24 h-20 rounded-lg object-cover"
                        />
                      ))}
                  </div>
                </div>

                {/* Payment Options Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Payment Options <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register("payment", {
                        required: {
                          value: true,
                          message: "Payment is required",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none bg-white"
                    >
                      <option value="">Select payment option</option>
                      {paymentOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> All fields marked with{" "}
                    <span className="text-red-500">*</span> are required. Make
                    sure to provide accurate product information.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button className="px-6 py-3 border-2 border-base-300 text-gray-700 rounded-lg hover:bg-base-200 transition-all font-medium">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-3 bg-primary text-secondary rounded-lg hover:opacity-90 transition-all font-medium shadow-lg flex items-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Uploading...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Form Card */}
        </div>
      </div>
    );
  } else {
    return <UnauthorizedPage />;
  }
}
