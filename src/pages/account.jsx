import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "../components/editModal";
import Modal from "../components/modal";
import {
  selectAccounts,
  selectAccountLoading,
  selectAccountError,
  getAllAccounts,
  deleteAccount,
  selectAccountBalance,
  getAccountTypeBalances,
} from "../redux/account/accountSlice";
import AccountBalanceCards from "../components/AccountBalanceCards";

const Account = () => {
  const column = [
    { id: "id", name: "ID" },
    { id: "accountNumber", name: "Account Number" },
    { id: "name", name: "Account Name" },
    { id: "type", name: "Account Type" },
    { id: "currentBalance", name: "Current Balance" },
    { id: "currency", name: "Currency" },
    { id: "action", name: "Action" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();

  // Get data from Redux store
  const accounts = useSelector(selectAccounts);
  const accountsBalance = useSelector(selectAccountBalance);
  const loading = useSelector(selectAccountLoading);
  const error = useSelector(selectAccountError);

  // Fetch accounts on component mount
  useEffect(() => {
    dispatch(getAllAccounts());
    dispatch(getAccountTypeBalances());
  }, [dispatch]);

  // handle edit
  const handleEdit = (account) => {
    setSelectedAccount(account);
    setEditIsOpen(true);
  };

  // handle successful edit submission
  const handleEditSuccess = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(getAllAccounts()).unwrap();
      await dispatch(getAccountTypeBalances()).unwrap();
      setEditIsOpen(false);
      setSelectedAccount(null);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle successful create submission
  const handleCreateSuccess = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(getAllAccounts()).unwrap();
      await dispatch(getAccountTypeBalances()).unwrap();
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    if (id && window.confirm("Are you sure you want to delete this account?")) {
      setIsSubmitting(true);
      try {
        await dispatch(deleteAccount(id)).unwrap();
        await Promise.all([
          dispatch(getAllAccounts()).unwrap(),
          dispatch(getAccountTypeBalances()).unwrap()
        ]);
      } catch (error) {
        console.error('Error deleting account:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading && !isSubmitting) {
    return <div className="p-4">Loading accounts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  let count = 0;
  return (
    <div className="p-4 flex flex-col gap-3">
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-fit rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsOpen(true)}
        disabled={isSubmitting}
      >
        Add New Account (+)
      </button>
      <AccountBalanceCards accountsBalance={accountsBalance} />
    
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-nowrap">
            <tr>
              {column.map((item) => (
                <th
                  key={item.id}
                  className="px-6 py-3 text-left text-xs font-black text-gray-500 uppercase tracking-wider"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts && accounts.length > 0 ? (
              accounts.map((account) => (
                <tr key={account?.id} className="hover:bg-gray-50 text-nowrap">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {(count += 1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account?.accountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {account?.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account?.currentBalance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account?.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 p-2 rounded-full transition-colors duration-200"
                      onClick={() => handleEdit(account)}
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-full transition-colors duration-200"
                      onClick={() => handleDelete(account?.id)}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={column.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No accounts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => !isSubmitting && setIsOpen(false)}
        title="Create Account"
        onSuccess={handleCreateSuccess}
        isSubmitting={isSubmitting}
      />
      <EditModal
        isOpen={isEditOpen}
        onClose={() => !isSubmitting && setEditIsOpen(false)}
        title="Edit Account"
        account={selectedAccount}
        onSuccess={handleEditSuccess}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Account;
