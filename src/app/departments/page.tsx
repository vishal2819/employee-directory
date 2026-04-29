import { getDepartments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import AddDepartmentForm from '@/components/AddDepartmentForm';

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Departments</h1>
          <p className="text-slate-500 mt-1">Manage your organization's departments</p>
        </div>
        <AddDepartmentForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">ID: {dept.id}</p>
            </CardContent>
          </Card>
        ))}
        {departments.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No departments found. Run the seed script to populate data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
