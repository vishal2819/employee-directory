'use client';

import Link from 'next/link';
import { 
  Users, 
  LayoutDashboard, 
  Building2, 
  Settings, 
  HelpCircle,
  LogOut,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAddEmployee } from './AddEmployeeContext';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: false },
  { label: 'Employees', icon: Users, href: '/', active: true },
  { label: 'Departments', icon: Building2, href: '/departments', active: false },
  { label: 'Add Member', icon: UserPlus, href: '#', onClick: true },
];

const secondaryItems = [
  { label: 'Settings', icon: Settings, href: '/settings' },
  { label: 'Help Center', icon: HelpCircle, href: '/help' },
];

export default function Sidebar() {
  const { openDialog } = useAddEmployee();
  const router = useRouter();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Add actual logout logic here when auth is implemented
      alert('Logout functionality will be implemented with authentication');
    }
  };

  return (
    <aside className="w-64 border-r bg-white flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
          <Users className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">StaffSync</span>
      </div>

      <nav className="flex-1 px-4 space-y-8 mt-4">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.onClick ? (
                  <button
                    onClick={openDialog}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left",
                      "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className="h-5 w-5 text-slate-400" />
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      item.active 
                        ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", item.active ? "text-indigo-600" : "text-slate-400")} />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">System</p>
          <ul className="space-y-1">
            {secondaryItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                >
                  <item.icon className="h-5 w-5 text-slate-400" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
