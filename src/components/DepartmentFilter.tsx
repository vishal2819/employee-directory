'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Department } from '@/lib/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function DepartmentFilter({ departments }: { departments: Department[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDept = searchParams.get('dept') || "all";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set('dept', value);
    } else {
      params.delete('dept');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Filter by:</span>
      <Select value={currentDept} onValueChange={handleFilterChange}>
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept.id} value={dept.id}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
