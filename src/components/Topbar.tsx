import { Search, Bell, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Topbar() {
  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
      <div className="w-96 relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
        <Input 
          placeholder="Search employees, departments..." 
          className="pl-10 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-indigo-600 focus-visible:bg-white transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        <button className="flex items-center gap-3 p-1 pl-1 pr-3 hover:bg-slate-50 rounded-full transition-all border border-transparent hover:border-slate-100">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Jane Doe</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
