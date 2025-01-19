import React from 'react';
import { 
  Wallet, 
  Smartphone, 
  Building2, 
  Bitcoin, 
  DollarSign,
  PiggyBank 
} from 'lucide-react';

const AccountBalanceCards = ({ accountsBalance }) => {
  const cards = [
    {
      type: 'MOBILE_MONEY',
      label: 'Mobile Money',
      icon: Smartphone,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    },
    {
      type: 'BANK',
      label: 'Bank Account',
      icon: Building2,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      type: 'CASH',
      label: 'Cash',
      icon: Wallet,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      type: 'CRYPTO',
      label: 'Crypto',
      icon: Bitcoin,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700'
    },
    {
      type: 'OTHER',
      label: 'Other',
      icon: DollarSign,
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-500',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-700'
    }
  ];

  const totalBalance = accountsBalance?.summary?.formattedTotalBalance || "0.00";
  const totalAccounts = accountsBalance?.summary?.totalAccounts || 0;

  return (
    <div className="p-4 space-y-6">
      {/* Total Balance Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Total Balance</h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ${totalBalance}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Across {totalAccounts} accounts
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <PiggyBank className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Account Type Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ type, label, icon: Icon, bgColor, iconColor, borderColor, textColor }) => {
          const balance = accountsBalance?.balances?.[type]?.formattedBalance || "0.00";
          
          return (
            <div 
              key={type}
              className={`${bgColor} border ${borderColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className={`text-lg font-semibold ${textColor}`}>
                      ${balance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountBalanceCards;