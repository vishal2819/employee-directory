'use client';

import { useState } from 'react';
import { addEmployee } from '@/lib/actions';
import { Department, EmployeeSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

export default function AddEmployeeForm({ 
  departments, 
  open, 
  onOpenChange 
}: { 
  departments: Department[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const rawData = {
      id: formData.get('id'),
      name: formData.get('name'),
      position: formData.get('position'),
      salary: parseFloat(formData.get('salary') as string),
      departmentId: formData.get('departmentId'),
    };

    const result = EmployeeSchema.safeParse(rawData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setIsPending(false);
      return;
    }

    const response = await addEmployee(formData);
    if (response?.error) {
      setErrors(response.error);
    } else {
      onOpenChange?.(false);
      setErrors({});
      // Optionally show a toast here
    }
    setIsPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter the employee details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="id" className="text-sm font-medium">Employee ID</label>
              <Input id="id" name="id" placeholder="EMP-001" required />
              {errors.id && <p className="text-destructive text-xs">{errors.id[0]}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input id="name" name="name" placeholder="John Doe" required />
              {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="position" className="text-sm font-medium">Position</label>
              <Input id="position" name="position" placeholder="Software Engineer" required />
              {errors.position && <p className="text-destructive text-xs">{errors.position[0]}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="salary" className="text-sm font-medium">Salary</label>
              <Input id="salary" name="salary" type="number" step="0.01" placeholder="75000" required />
              {errors.salary && <p className="text-destructive text-xs">{errors.salary[0]}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="departmentId" className="text-sm font-medium">Department</label>
              <Select name="departmentId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.departmentId && <p className="text-destructive text-xs">{errors.departmentId[0]}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
          {errors._form && <p className="text-destructive text-sm mt-2 text-center">{errors._form[0]}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
