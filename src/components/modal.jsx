import React, { useState } from "react";
import { validateCompany } from "../utils/validation";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { CreateCompany } from "../redux/actionCreater";
const Modal = ({ isOpen, onClose, title }) => {
  const [agreeterm, agreementchange] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    validate: validateCompany,
    initialValues: {
      name: "",
      email: "",
      address: "",
      type: "",
      phone: "",
    },
    onSubmit: async (values) => {
      dispatch(CreateCompany(values));
      formik.resetForm();
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="name"
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name..."
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.name}
              </p>
            ) : null}
          </div>
          <div>
            <input
              type="email"
              id="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email..."
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              id="phone"
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number..."
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.phone}
              </p>
            ) : null}
          </div>
          <div>
            <input
              type="text"
              id="address"
              onBlur={formik.handleBlur}
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter address..."
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.address}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                id="type"
                value="MNC"
                checked={formik.values.type === "MNC"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">MNC</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="type"
                id="type"
                value="DOMESTIC"
                checked={formik.values.type === "DOMESTIC"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-gray-700">DOMESTIC</span>
            </label>
            {formik.touched.type && formik.errors.type ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.type}
              </p>
            ) : null}
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={agreeterm}
              onChange={(e) => agreementchange(e.target.checked)}
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">
              I agree to the terms and conditions
            </span>
          </label>
        </form>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={formik.submitForm}
            disabled={!agreeterm}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              agreeterm
                ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
