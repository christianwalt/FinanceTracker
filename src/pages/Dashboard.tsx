import React from 'react';
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <p className={`text-sm mt-2 flex items-center ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend.startsWith('+') ? <TrendingUp size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1 transform rotate-180" />}
          {trend} from last month
        </p>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

const spendingData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [3000, 3500, 3200, 3800, 3400, 3900],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
    },
    {
      label: 'Expenses',
      data: [2300, 2800, 2400, 2900, 2600, 2700],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
    },
  ],
};

const categoryData = {
  labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Others'],
  datasets: [
    {
      data: [35, 25, 15, 10, 10, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
    },
  ],
};

export const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Balance"
          value="$24,500"
          icon={<Wallet size={24} className="text-blue-600" />}
          trend="+12.5%"
        />
        <StatCard
          title="Monthly Income"
          value="$8,200"
          icon={<ArrowDownToLine size={24} className="text-green-600" />}
          trend="+8.2%"
        />
        <StatCard
          title="Monthly Expenses"
          value="$3,800"
          icon={<ArrowUpToLine size={24} className="text-red-600" />}
          trend="-3.1%"
        />
        <StatCard
          title="Monthly Savings"
          value="$4,400"
          icon={<TrendingUp size={24} className="text-purple-600" />}
          trend="+22.4%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
          <div className="h-64">
            <Line
              data={spendingData}
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
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <div className="h-64">
            <Doughnut
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};