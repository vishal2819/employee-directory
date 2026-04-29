import { z } from 'zod';

export const DepartmentSchema = z.object({
  _id: z.string().optional(),
  id: z.string().min(1, "Department ID is required"),
  name: z.string().min(1, "Department name is required"),
  floor: z.number().int().min(0, "Floor must be a non-negative integer"),
});

export const EmployeeSchema = z.object({
  _id: z.string().optional(),
  id: z.string().min(1, "Employee ID is required"),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  salary: z.number().positive("Salary must be a positive number"),
  departmentId: z.string().min(1, "Department ID is required"),
});

export type Department = z.infer<typeof DepartmentSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;

export type EmployeeWithDepartment = Employee & {
  department?: Department;
};
