'use client';

import { useState } from 'react';
import { addDepartment } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export default function AddDepartmentForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const response = await addDepartment(formData);
    
    if (response?.error) {
      setErrors(response.error);
    } else {
      setOpen(false);
      setErrors({});
    }
    setIsPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
            <DialogDescription>
              Enter the department details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="id" className="text-sm font-medium">Department ID</label>
              <Input id="id" name="id" placeholder="DEPT-001" required />
              {errors.id && <p className="text-destructive text-xs">{errors.id[0]}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Department Name</label>
              <Input id="name" name="name" placeholder="Engineering" required />
              {errors.name && <p className="text-destructive text-xs">{errors.name[0]}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="floor" className="text-sm font-medium">Floor</label>
              <Input id="floor" name="floor" type="number" placeholder="1" required />
              {errors.floor && <p className="text-destructive text-xs">{errors.floor[0]}</p>}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
          {errors._form && <p className="text-destructive text-sm mt-2 text-center">{errors._form[0]}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
