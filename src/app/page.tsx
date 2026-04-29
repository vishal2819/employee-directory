import { getDepartments, getEmployees } from '@/lib/data';
import DepartmentFilter from '@/components/DepartmentFilter';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import Link from 'next/link';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Filter, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageProps {
  searchParams: Promise<{ dept?: string }>;
}

const AVATAR_COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
];

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const departments = await getDepartments();
  const employees = await getEmployees(params.dept);

  // Create a map for department lookup
  const deptMap = new Map(departments.map(d => [d.id, d.name]));

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Employees</h1>
          <p className="text-slate-500 mt-1">Manage, filter and organize your team members efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-slate-600 border-slate-200">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <AddEmployeeForm departments={departments} />
        </div>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white rounded-xl border shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <DepartmentFilter departments={departments} />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          Showing <span className="font-semibold text-slate-900">{employees.length}</span> results
        </div>
      </div>

      {/* Main Table */}
      <Card className="border shadow-md rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-b border-slate-100">
                <TableHead className="w-[80px] px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">ID</TableHead>
                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Employee</TableHead>
                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Position</TableHead>
                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Salary</TableHead>
                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee, idx) => {
                const employeeId = employee.id || `temp-${idx}`;
                const displayId = employeeId.length > 4 ? employeeId.slice(-4).toUpperCase() : employeeId.toUpperCase();
                
                return (
                <TableRow key={employeeId} className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-6 py-4 font-mono text-xs text-slate-400">{displayId}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner shrink-0",
                        AVATAR_COLORS[idx % AVATAR_COLORS.length]
                      )}>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                  <div>
                         <p className="font-bold text-slate-900 leading-none mb-1">{employee.name}</p>
                         <p className="text-xs text-slate-500">{employee.position}</p>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-700">{employee.position}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                        {deptMap.get(employee.departmentId) || employee.departmentId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold text-slate-900">
                    ${employee.salary.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold px-3 rounded-lg">
                        <Link href={`/employee/${employee.id}`}>Details</Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
              })}
              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center">
                        <Filter className="h-8 w-8 text-slate-200" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900">No employees found</p>
                        <p className="text-sm text-slate-400 max-w-[200px] mx-auto">Try adjusting your filters or search to find what you're looking for.</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
