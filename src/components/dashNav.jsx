import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Wallet,
  ArrowLeftRight,
  PieChart,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const DashNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const nav = [
    {
      name: "Accounts",
      path: "/dashboard/accounts",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <ArrowLeftRight className="w-5 h-5" />,
    },
    {
      name: "Budget",
      path: "/dashboard/budget",
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  return (
    <div className="p-4 md:p-5 mt-5 rounded-md bg-slate-200">
      <div className="flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-slate-800 hover:text-slate-600"
        >
          Wallet App
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex items-center space-x-6">
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 text-slate-700 hover:text-slate-900"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/dashboard/profile"
            className="p-2 text-white rounded-full bg-slate-700 cursor-pointer"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-slate-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            {nav.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center space-x-2 text-slate-700 hover:text-slate-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-300">
            <div className="p-2 text-white rounded-full bg-slate-700 cursor-pointer">
              <User className="w-5 h-5" />
            </div>
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-slate-700"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashNav;
