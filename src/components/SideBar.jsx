import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Scissors, 
  Package, 
  Users, 
  UserCheck,
  BarChart3, 
  Settings, 
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Production', icon: Scissors },
    { name: 'Inventory', icon: Package },
    { name: 'Buyers', icon: Users },
    { name: 'User Management', icon: UserCheck },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-primary h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-secondary/20">
        <div className="flex items-center space-x-3">
          <div className="bg-secondary text-primary p-2 rounded-lg">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-secondary font-bold text-lg">Garments Tracker</h1>
            <p className="text-secondary/70 text-xs">Production System</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center space-x-3 px-4 py-3 text-secondary rounded-lg hover:bg-secondary hover:text-primary transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-secondary/20">
        <a
          href="#"
          className="flex items-center space-x-3 px-4 py-3 text-secondary rounded-lg hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </a>
      </div>
    </div>
  );
}