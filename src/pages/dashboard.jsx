import React from "react";
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

const Dashboard = () => {
  // Sample data - replace with real data from your backend
  const chartData = [
    { name: "Jan", expenses: 4000, income: 4400 },
    { name: "Feb", expenses: 3000, income: 4200 },
    { name: "Mar", expenses: 5000, income: 4800 },
    { name: "Apr", expenses: 2780, income: 3908 },
    { name: "May", expenses: 1890, income: 4800 },
    { name: "Jun", expenses: 2390, income: 3800 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <Button
          title="+ Add Transaction"
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
            <div className="text-2xl font-bold">$12,450</div>
            <div className="flex items-center pt-1 text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4" />
              <span>+12.5%</span>
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
            <div className="text-2xl font-bold">$4,800</div>
            <div className="flex items-center pt-1 text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4" />
              <span>+8.2%</span>
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
            <div className="text-2xl font-bold">$2,390</div>
            <div className="flex items-center pt-1 text-sm text-red-600">
              <ArrowDownRight className="w-4 h-4" />
              <span>-4.3%</span>
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
            <div className="text-2xl font-bold">75%</div>
            <div className="w-full h-2 mt-2 bg-slate-200 rounded-full">
              <div className="w-3/4 h-2 bg-blue-600 rounded-full"></div>
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
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Online Purchase</div>
                  <div className="text-sm text-slate-500">Amazon</div>
                </div>
              </div>
              <div className="text-red-600 font-medium">-$250.00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
