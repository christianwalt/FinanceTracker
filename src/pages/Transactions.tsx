import React from 'react';
import { Plus, Search, Filter, ArrowUpRight, ArrowDownRight, Calendar, Tag } from 'lucide-react';
import { TransactionModal } from '../components/TransactionModal';

const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Salary Deposit',
    category: 'Income',
    amount: 3500.00,
    type: 'income'
  },
  {
    id: 2,
    date: '2024-03-14',
    description: 'Grocery Shopping',
    category: 'Food',
    amount: 150.25,
    type: 'expense'
  },
  {
    id: 3,
    date: '2024-03-14',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    amount: 15.99,
    type: 'expense'
  },
  {
    id: 4,
    date: '2024-03-13',
    description: 'Freelance Payment',
    category: 'Income',
    amount: 850.00,
    type: 'income'
  },
  {
    id: 5,
    date: '2024-03-13',
    description: 'Electric Bill',
    category: 'Utilities',
    amount: 95.50,
    type: 'expense'
  }
];

const categories = [
  'All Categories',
  'Income',
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Shopping',
  'Healthcare',
  'Others'
];

export const Transactions = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All Categories');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingTransaction, setEditingTransaction] = React.useState<any>(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleTransactionSubmit = (data: any) => {
    console.log('Transaction data:', data);
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction: any) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Income & Expenses</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          New Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <ArrowDownRight size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-2xl font-bold text-green-600">+${totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <ArrowUpRight size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">-${totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-gray-400" />
                <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Tag size={20} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Date</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Description</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Category</th>
                <th className="text-right py-4 px-4 font-semibold text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEditTransaction(transaction)}
                >
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-gray-800">{transaction.description}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`py-4 px-4 text-right ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleTransactionSubmit}
        initialData={editingTransaction}
      />
    </div>
  );
};