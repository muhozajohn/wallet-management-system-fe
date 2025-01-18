import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DeleteCompany, GetAllCompanys } from "../redux/actionCreater";
import Modal from "./modal";
import EditModal from "./editModal";
import { connect, useDispatch } from "react-redux";

const Company = ({ companystate, loadCompany }) => {
  // Destructured props here
  const column = [
    { id: "id", name: "Id" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "address", name: "Address" },
    { id: "type", name: "Company Type" },
    { id: "action", name: "Action" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadCompany();
  }, [loadCompany]); // Added loadCompany as dependency

  const [selectedCompany, setSelectedCompany] = useState(null);

  // handle edit
  const handleEdit = (company) => {
    setSelectedCompany(company);
    setEditIsOpen(true);
  };
  // handle delete
  const handleDelete = (id) => {
    if (id) {
      if (window.confirm("Are you sure you want to delete this company?")) {
        dispatch(DeleteCompany(id));
        dispatch(GetAllCompanys());
      }
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-fit rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsOpen(true)}
      >
        Add New(+)
      </button>
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
            {companystate.companylist &&
              companystate.companylist.map((company) => (
                <tr key={company?.id} className="hover:bg-gray-50 text-nowrap">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company?.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company?.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {company?.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {company?.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 p-2 rounded-full transition-colors duration-200"
                      onClick={() => handleEdit(company)}
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 p-2 rounded-full transition-colors duration-200"
                      onClick={() => handleDelete(company?.id)}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Company"
      />
      <EditModal
        isOpen={isEditOpen}
        onClose={() => {
          setEditIsOpen(false);
          setSelectedCompany(null);
        }}
        title="Edit Company"
        company={selectedCompany}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  companystate: state.company,
});

const mapDispatchToProps = (dispatch) => ({
  loadCompany: () => dispatch(GetAllCompanys()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Company);
