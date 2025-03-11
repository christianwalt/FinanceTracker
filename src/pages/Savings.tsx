import React from 'react';
import { Plus, Target, Rocket, Trophy } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const savingsGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    target: 10000,
    current: 7500,
    deadline: '2024-12-31',
    icon: <Target size={24} className="text-blue-600" />,
  },
  {
    id: 2,
    name: 'New Car',
    target: 25000,
    current: 15000,
    deadline: '2025-06-30',
    icon: <Rocket size={24} className="text-purple-600" />,
  },
  {
    id: 3,
    name: 'Vacation',
    target: 5000,
    current: 4200,
    deadline: '2024-08-31',
    icon: <Trophy size={24} className="text-green-600" />,
  },
];

const savingsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Total Savings',
      data: [15000, 18000, 21000, 23000, 25000, 26700],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
  ],
};

export const Savings = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Savings Goals</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus size={20} className="mr-2" />
          New Savings Goal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {savingsGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{goal.name}</h3>
                  <p className="text-sm text-gray-500">Due {new Date(goal.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>${goal.current.toLocaleString()}</span>
                <span>${goal.target.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {Math.round((goal.current / goal.target) * 100)}% completed
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Savings Growth</h3>
          <div className="h-64">
            <Line
              data={savingsData}
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
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Plus size={24} className="text-green-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Add to Savings</h4>
                  <p className="text-sm text-gray-500">Make a deposit to your savings goal</p>
                </div>
              </div>
              <span className="text-green-600">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Target size={24} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium">Adjust Goal</h4>
                  <p className="text-sm text-gray-500">Modify your savings target or deadline</p>
                </div>
              </div>
              <span className="text-blue-600">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};