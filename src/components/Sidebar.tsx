import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  WalletCards,
  PiggyBank,
  BarChart3,
  Target,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-blue-100 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={24} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <WalletCards size={24} />, label: 'Income & Expenses', path: '/transactions' },
    { icon: <Target size={24} />, label: 'Budgeting', path: '/budgeting' },
    { icon: <PiggyBank size={24} />, label: 'Savings', path: '/savings' },
    { icon: <BarChart3 size={24} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">FinanceTrack</h1>
      </div>
      
      <div className="flex-1 px-3 py-4 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut size={24} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};