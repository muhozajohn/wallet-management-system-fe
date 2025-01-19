import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateAccount } from "../redux/account/accountSlice";
import { validateAccount } from "../utils/validation";
import Input from "./input";

const EditModal = ({ isOpen, onClose, title, account, onSuccess, isSubmitting }) => {
  const [agreeterm, agreementchange] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    validate: validateAccount,
    enableReinitialize: true,
    initialValues: {
      name: account?.name || "",
      type: account?.type || "",
      currentBalance: account?.currentBalance || "0.00",
      currency: account?.currency || "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await dispatch(updateAccount({
          id: account.id,
          accountData: values,
        })).unwrap();
        
        // Call the success callback if provided
        if (onSuccess) {
          await onSuccess();
        }
        
        formik.resetForm();
        onClose();
      } catch (error) {
        // Handle error - you might want to show an error message
        console.error("Failed to update account:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!isOpen) {
      agreementchange(false);
      // formik.resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine if the form should be disabled
  const isFormDisabled = loading || isSubmitting;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            disabled={isFormDisabled}
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
            <Input
              type="input"
              inputType="text"
              label="Account name"
              id="name"
              disabled={isFormDisabled}
              onBlur={formik.handleBlur}
              values={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter account name..."
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <Input
              type="input"
              inputType="number"
              label="Current Balance"
              step="0.01"
              id="currentBalance"
              disabled={isFormDisabled}
              onBlur={formik.handleBlur}
              values={formik.values.currentBalance}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current balance..."
            />
            {formik.touched.currentBalance && formik.errors.currentBalance ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.currentBalance}
              </p>
            ) : null}
          </div>

          <div>
            <Input
              type="input"
              inputType="text"
              label="Currency"
              id="currency"
              onBlur={formik.handleBlur}
              disabled={isFormDisabled}
              values={formik.values.currency}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter currency..."
            />
            {formik.touched.currency && formik.errors.currency ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.currency}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="">Account Type</label>
            <select
              id="type"
              name="type"
              value={formik.values.type}
              disabled={isFormDisabled}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Account Type</option>
              <option value="BANK">Bank</option>
              <option value="MOBILE_MONEY">Mobile Money</option>
              <option value="CASH">Cash</option>
              <option value="CRYPTO">Crypto</option>
              <option value="OTHER">Other</option>
            </select>
            {formik.touched.type && formik.errors.type ? (
              <p className="text-sm text-red-600 font-normal">
                {formik.errors.type}
              </p>
            ) : null}
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              disabled={isFormDisabled}
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
            disabled={isFormDisabled}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={formik.submitForm}
            disabled={!agreeterm || isFormDisabled}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              agreeterm
                ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                : "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
            }`}
          >
             {isFormDisabled ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Edit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
