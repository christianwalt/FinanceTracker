import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const budgetData = {
  labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Others'],
  datasets: [
    {
      label: 'Budget',
      data: [2000, 800, 400, 300, 500, 200],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      label: 'Spent',
      data: [1800, 750, 350, 400, 450, 150],
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
    },
  ],
};

export const Budgeting = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Budget Planning</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={20} className="mr-2" />
          New Budget Category
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Monthly Budget</h3>
            <span className="text-2xl font-bold text-blue-600">$4,200</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">$3,150 spent of $4,200 budget</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Remaining</h3>
            <span className="text-2xl font-bold text-green-600">$1,050</span>
          </div>
          <p className="text-sm text-gray-500">25% of budget remaining</p>
          <p className="text-sm text-gray-500 mt-1">15 days left in month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Alerts</h3>
            <AlertCircle size={24} className="text-yellow-500" />
          </div>
          <p className="text-sm text-yellow-600">Entertainment category over budget by $100</p>
          <p className="text-sm text-gray-500 mt-1">2 categories near limit</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-6">Budget vs Spending by Category</h3>
        <div className="h-80">
          <Bar
            data={budgetData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `$${value}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Budget Categories</h3>
        <div className="space-y-4">
          {budgetData.labels.map((category, index) => (
            <div key={category} className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{category}</span>
                <span className="text-sm text-gray-500">
                  ${budgetData.datasets[1].data[index]} of ${budgetData.datasets[0].data[index]}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    budgetData.datasets[1].data[index] > budgetData.datasets[0].data[index]
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${(budgetData.datasets[1].data[index] / budgetData.datasets[0].data[index]) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};