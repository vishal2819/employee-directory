import { getEmployeeById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Briefcase, Building2, DollarSign, IdCard, MapPin, User } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const employee = await getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" asChild className="gap-2 text-slate-500 hover:text-slate-900">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </Button>

        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-white border-b p-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-10 w-10" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-slate-900">{employee.name}</CardTitle>
                <p className="text-lg text-slate-500 font-medium">{employee.position}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Employment Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      <IdCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Employee ID</p>
                      <p className="text-sm font-semibold text-slate-900">{employee.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Position</p>
                      <p className="text-sm font-semibold text-slate-900">{employee.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Annual Salary</p>
                      <p className="text-sm font-semibold text-slate-900">${employee.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Department Information</h4>
                {employee.department ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Department Name</p>
                        <p className="text-sm font-semibold text-slate-900">{employee.department.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Location</p>
                        <p className="text-sm font-semibold text-slate-900">Floor {employee.department.floor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <IdCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Department ID</p>
                        <p className="text-sm font-semibold text-slate-900">{employee.department.id}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-3 text-red-600">
                    <p className="text-sm font-medium italic">Department information not available.</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-sm text-slate-500">
                Contact information and additional records are managed in the <span className="font-semibold">HR Portal</span>.
              </div>
              <Button size="sm" variant="outline">Request Edit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
