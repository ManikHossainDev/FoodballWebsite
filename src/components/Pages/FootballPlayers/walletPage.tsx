import React from 'react';
import { CreditCard, Ban } from 'lucide-react';

const transactions = [
  { receiver: 'Coach', service: 'Video Review', amount: 75.67, date: '20 Dec 4:30 PM' },
  { receiver: 'Coach', service: 'Consultation Book', amount: 75.67, date: '20 Dec 4:30 PM' },
  { receiver: 'Coach', service: 'Consultation Book', amount: 75.67, date: '20 Dec 4:30 PM' },
  { receiver: 'Coach', service: 'Consultation Book', amount: 75.67, date: '20 Dec 4:30 PM' },
  { receiver: 'Coach', service: 'Consultation Book', amount: 75.67, date: '20 Dec 4:30 PM' },
  { receiver: 'Coach', service: 'Consultation Book', amount: 75.67, date: '20 Dec 4:30 PM' },
  { receiver: 'Coach', service: 'Consultation Book', amount: 75.67, date: '20 Dec 4:30 PM' },
];

const WalletPage = () => {
  return (
    <div className="text-white">
      {/* Header: Balance + Add Balance card */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        {/* Left - Balance */}
        <div>
          <p className="text-gray-400 text-sm mb-2">
            My Account <span className="text-gray-600">/</span>{' '}
            <span className="text-gray-300">Total Balance</span>
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-[2.25rem] font-bold text-white leading-none">
              $223,431.37
            </h1>
            <span className="bg-violet-500/15 text-violet-300 border border-violet-500/30 text-xs font-medium px-3 py-1 rounded-full">
              USD
            </span>
          </div>
        </div>

        {/* Right - Add Balance card */}
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-5 py-4 flex items-center justify-between gap-6 w-full xl:w-[35%]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-red-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-white font-semibold text-sm">Add Balance</h3>
              <p className="text-gray-400 text-xs mt-0.5 leading-snug">
                Add balance to your wallet to continue all the transactions
              </p>
            </div>
          </div>
          <button className=" text-sm px-5 py-2.5  whitespace-nowrap transition-colors flex-shrink-0 rounded-md bg-[#FFFFFF] border border-red-400 text-red-400 font-semibold shadow-[0_0_20px_rgba(255,0,0,0.5)]">
            Add Balance
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-white font-semibold text-lg mb-4">Recent Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2 w-12">Type</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Receiver</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Service Type</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Amount</th>
                <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={idx}
                  className="border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#1a1a1a] transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Ban className="w-4 h-4 text-red-500" />
                    </div>
                  </td>
                  <td className="py-4 px-2 text-white text-sm">{tx.receiver}</td>
                  <td className="py-4 px-2 text-gray-400 text-sm">{tx.service}</td>
                  <td className="py-4 px-2 text-red-500 text-sm font-medium">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-gray-400 text-sm">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;