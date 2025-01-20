import React, { useState, useEffect } from 'react';
import { createcategory, getAllcategorys, selectcategorys } from '../redux/category/categorySlice';
import { createsubcategory, getAllsubcategorys, selectsubcategorys } from '../redux/subcategory/subCategorySlice';
import { createbudgetcategory, selectbudgetcategorys, getAllbudgetcategorys } from '../redux/budgetcategory/budgetCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess } from '../utils/notification';

// Select Component
const Select = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(opt => opt.value === value)?.label || "Select option"}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Data Table Component
const DataTable = ({ data, columns }) => (
  <div className="mt-4 overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item?.id}>
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {column?.render ? column.render(item) : item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Category Form Component
const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(selectcategorys);

  const categoryColumns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'createdAt', label: 'Created At', render: (item) => new Date(item.createdAt).toLocaleDateString() }
  ];

  const resetForm = () => {
    setCategoryName('');
    setCategoryType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !categoryType) return;

    try {
      await dispatch(createcategory({ name: categoryName, type: categoryType }));
      notifySuccess("Category successfully Added");
      resetForm();
      dispatch(getAllcategorys());
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          
          <Select
            label="Category Type"
            options={[
              { value: 'EXPENSE', label: 'Expense' },
              { value: 'INCOME', label: 'Income' }
            ]}
            value={categoryType}
            onChange={setCategoryType}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Category
          </button>
        </form>
      </div>
      <DataTable data={categories} columns={categoryColumns} />
    </div>
  );
};

// SubCategory Form Component
const SubCategoryForm = () => {
  const [parentCategory, setParentCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(selectcategorys);
  const subcategories = useSelector(selectsubcategorys);

  useEffect(() => {
    dispatch(getAllcategorys());
  }, [dispatch]);

  const subCategoryColumns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Parent Category', render: (item) => item?.category?.name },
    { key: 'createdAt', label: 'Created At', render: (item) => new Date(item.createdAt).toLocaleDateString() }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parentCategory || !subCategoryName) return;

    try {
      await dispatch(createsubcategory({ 
        categoryId: parseInt(parentCategory), 
        name: subCategoryName 
      }));
      notifySuccess("SubCategory successfully Added");
      setParentCategory('');
      setSubCategoryName('');
      dispatch(getAllsubcategorys());
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add SubCategory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Parent Category"
            options={categories.map(category => ({
              value: category.id,
              label: category.name
            }))}
            value={parentCategory}
            onChange={setParentCategory}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SubCategory Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add SubCategory
          </button>
        </form>
      </div>
      <DataTable data={subcategories} columns={subCategoryColumns} />
    </div>
  );
};

// Budget Category Form Component
const BudgetCategoryForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [spentAmount, setspentAmount] = useState('');
  const [budget, setBudget] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(selectcategorys);
  const budgetCategories = useSelector(selectbudgetcategorys);

  const budgetCategoryColumns = [
    { key: 'category', label: 'Category', render: (item) => item.category.name },
    { key: 'allocatedAmount', label: 'Allocated Amount', render: (item) => `$${item.allocatedAmount}` },
    { key: 'spentAmount', label: 'Spent Amount', render: (item) => `$${item.spentAmount}` },
    { key: 'budget', label: 'Budget', render: (item) => item.budget.name },
    { key: 'createdAt', label: 'Created At', render: (item) => new Date(item.createdAt).toLocaleDateString() }
  ];

  useEffect(() => {
    if (budgetCategories.length > 0 && !budget) {
      setBudget(budgetCategories[0].budget?.id);
    }
  }, [budgetCategories, budget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || !spentAmount || !budget) return;
    try {
      await dispatch(createbudgetcategory({ 
        categoryId: parseInt(category),
        budgetId: parseInt(budget),
        allocatedAmount: parseFloat(amount),
        spentAmount: parseFloat(spentAmount)
      }));
      notifySuccess("Budget Category successfully Added");
      setCategory('');
      setAmount('');
      setspentAmount('');
      dispatch(getAllbudgetcategorys());
    } catch (error) {
      console.error('Error creating budget category:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Budget Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Category"
            options={categories.map(category => ({
              value: category.id,
              label: category?.name
            }))}
            value={category}
            onChange={setCategory}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allocated Amount
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            Spent Amount
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={spentAmount}
              onChange={(e) => setspentAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Budget Category
          </button>
        </form>
      </div>
      <DataTable data={budgetCategories} columns={budgetCategoryColumns} />
    </div>
  );
};

// Main Settings Component
const Settings = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllcategorys());
    dispatch(getAllsubcategorys());
    dispatch(getAllbudgetcategorys());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'categories' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'subcategories' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('subcategories')}
        >
          SubCategories
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'budget-categories' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('budget-categories')}
        >
          Budget Categories
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'categories' && <CategoryForm />}
        {activeTab === 'subcategories' && <SubCategoryForm />}
        {activeTab === 'budget-categories' && <BudgetCategoryForm />}
      </div>
    </div>
  );
};

export default Settings;