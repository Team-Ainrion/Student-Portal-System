import React from 'react';
import { BookOpen, AlignCenter as Assignment, MessageSquare, BarChart3, Users, Settings, GraduationCap, Calendar, FileText, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'assignments', label: 'Assignments', icon: Assignment },
      { id: 'messages', label: 'Messages', icon: MessageSquare },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    if (user?.role === 'teacher') {
      return [
        ...baseItems,
        { id: 'grading', label: 'Grading', icon: FileText },
        { id: 'announcements', label: 'Announcements', icon: Calendar },
        { id: 'analytics', label: 'Class Analytics', icon: BarChart3 },
      ];
    }

    return [
      ...baseItems,
      { id: 'grades', label: 'My Grades', icon: GraduationCap },
      { id: 'schedule', label: 'Schedule', icon: Calendar },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <GraduationCap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">EduPlatform</h2>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}