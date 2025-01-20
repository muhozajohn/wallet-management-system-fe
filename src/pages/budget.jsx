import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllbudgets,
  selectbudgets,
  selectbudgetLoading,
  selectbudgetError,
} from "../redux/budget/budgetSlice";
import AddBudgetModal from "../components/AddBudgetModal";

const Budget = () => {
  const dispatch = useDispatch();
  const budgets = useSelector(selectbudgets);
  const loading = useSelector(selectbudgetLoading);
  const error = useSelector(selectbudgetError);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllbudgets());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  const totalBudget = budgets?.reduce(
    (acc, budget) => acc + parseFloat(budget.amount),
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Budget Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Create Budget
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${totalBudget?.toLocaleString() || 0}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Active Budgets
            </h3>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {budgets?.length || 0}
          </div>
        </div>
      </div>

      {/* Budgets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Budget List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Start Date
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  End Date
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-500">
                  Currency
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {budgets?.map((budget) => (
                <tr
                  key={budget.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="p-4 text-sm text-gray-900">{budget.name}</td>
                  <td className="p-4 text-sm text-gray-900">
                    ${parseFloat(budget.amount).toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {new Date(budget.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {new Date(budget.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-gray-900">
                    {budget.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Budget;
