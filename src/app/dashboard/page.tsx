import { getDepartments, getEmployees } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const [departments, employees] = await Promise.all([
    getDepartments(),
    getEmployees()
  ]);

  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  // Department-wise employee count
  const deptStats = departments.map(dept => ({
    name: dept.name,
    count: employees.filter(emp => emp.departmentId === dept.id).length
  }));

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your employee directory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalEmployees}</div>
            <p className="text-xs text-slate-500 mt-1">Active employees</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalDepartments}</div>
            <p className="text-xs text-slate-500 mt-1">Active departments</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">${totalSalary.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Monthly payroll</p>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Salary</CardTitle>
            <TrendingUp className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">${avgSalary.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Per employee</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Stats */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deptStats.map(dept => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{dept.name}</p>
                    <p className="text-sm text-slate-500">{dept.count} employees</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/?dept=${dept.name.toLowerCase()}`}>View</Link>
                </Button>
              </div>
            ))}
            {deptStats.length === 0 && (
              <p className="text-center text-slate-500 py-4">No departments found. Run the seed script to populate data.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Employees */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.slice(0, 5).map(emp => (
              <div key={emp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{emp.name}</p>
                    <p className="text-sm text-slate-500">{emp.position}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/employee/${emp.id}`}>View</Link>
                </Button>
              </div>
            ))}
            {employees.length === 0 && (
              <p className="text-center text-slate-500 py-4">No employees found. Add your first employee to get started.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
