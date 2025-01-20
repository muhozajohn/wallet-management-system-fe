import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PieChart,
  ArrowLeftRight,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "../components/button";
import {
  getAllTransactions,
  selectTransactions
} from "../redux/transaction/tansactionSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  // Compute statistics and period changes from transactions
  const stats = useMemo(() => {
    // Get current and previous month dates
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Split transactions by period
    const currentMonthTransactions = transactions.filter(t => 
      new Date(t.transactionDate) >= currentMonthStart
    );
    const previousMonthTransactions = transactions.filter(t => 
      new Date(t.transactionDate) >= previousMonthStart && 
      new Date(t.transactionDate) < currentMonthStart
    );

    // Calculate totals for current period
    const totalIncome = currentMonthTransactions
      .filter(t => t.type === "INCOME")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpenses = currentMonthTransactions
      .filter(t => t.type === "EXPENSE")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalBalance = totalIncome - totalExpenses;

    // Calculate previous period totals
    const previousIncome = previousMonthTransactions
      .filter(t => t.type === "INCOME")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const previousExpenses = previousMonthTransactions
      .filter(t => t.type === "EXPENSE")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const previousBalance = previousIncome - previousExpenses;

    // Calculate percentage changes
    const calculatePercentageChange = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / Math.abs(previous)) * 100;
    };

    const incomeChange = calculatePercentageChange(totalIncome, previousIncome);
    const expensesChange = calculatePercentageChange(totalExpenses, previousExpenses);
    const balanceChange = calculatePercentageChange(totalBalance, previousBalance);

    return {
      totalIncome,
      totalExpenses,
      totalBalance,
      incomeChange: incomeChange.toFixed(1),
      expensesChange: expensesChange.toFixed(1),
      balanceChange: balanceChange.toFixed(1)
    };
  }, [transactions]);

  // Prepare chart data from transactions
  const chartData = useMemo(() => {
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      const month = new Date(transaction.transactionDate).toLocaleString('default', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { name: month, income: 0, expenses: 0 };
      }
      
      const amount = parseFloat(transaction.amount);
      if (transaction.type === "INCOME") {
        monthlyData[month].income += amount;
      } else {
        monthlyData[month].expenses += amount;
      }
    });

    return Object.values(monthlyData);
  }, [transactions]);

  // Format currency with symbol based on the account's currency
  const formatCurrency = (amount, currency = "USD") => {
    const symbols = {
      USD: "$",
      FRW: "FRW",
      BTC: "BTC",
    };
    return `${symbols[currency] || "$"}${parseFloat(amount).toLocaleString()}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <Button
          title="+ Add Transaction"
          path="/dashboard/transactions"
          styles="text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Balance Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-600">
              Total Balance
            </h3>
            <Wallet className="w-4 h-4 text-slate-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalBalance)}
            </div>
            <div className={`flex items-center pt-1 text-sm ${
              parseFloat(stats.balanceChange) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(stats.balanceChange) >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{stats.balanceChange > 0 ? '+' : ''}{stats.balanceChange}%</span>
            </div>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-600">Income</h3>
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalIncome)}
            </div>
            <div className={`flex items-center pt-1 text-sm ${
              parseFloat(stats.incomeChange) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(stats.incomeChange) >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{stats.incomeChange > 0 ? '+' : ''}{stats.incomeChange}%</span>
            </div>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-600">Expenses</h3>
            <ArrowLeftRight className="w-4 h-4 text-slate-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalExpenses)}
            </div>
            <div className={`flex items-center pt-1 text-sm ${
              parseFloat(stats.expensesChange) <= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(stats.expensesChange) >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{stats.expensesChange > 0 ? '+' : ''}{stats.expensesChange}%</span>
            </div>
          </div>
        </div>

        {/* Budget Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-600">
              Budget Status
            </h3>
            <PieChart className="w-4 h-4 text-slate-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {Math.round((stats.totalExpenses / stats.totalIncome) * 100)}%
            </div>
            <div className="w-full h-2 mt-2 bg-slate-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ 
                  width: `${Math.min((stats.totalExpenses / stats.totalIncome) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#dc2626"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-slate-500">
                    {transaction.account.name} - {transaction.category.name}
                  </div>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === "EXPENSE" ? "text-red-600" : "text-green-600"
              }`}>
                {transaction.type === "EXPENSE" ? "-" : "+"}
                {formatCurrency(transaction.amount, transaction.account.currency)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;