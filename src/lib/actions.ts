'use server';

import { connectToDatabase } from './mongodb';
import { EmployeeSchema, DepartmentSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { Document } from 'mongodb';

const DATABASE_NAME = 'employee_directory';

export async function addEmployee(formData: FormData) {
  const rawData = {
    id: formData.get('id'),
    name: formData.get('name'),
    position: formData.get('position'),
    salary: parseFloat(formData.get('salary') as string),
    departmentId: formData.get('departmentId'),
  };

  const validatedData = EmployeeSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      error: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const client = await connectToDatabase();
    const collection = client.db(DATABASE_NAME).collection('employees');
    
    const existing = await collection.findOne({ id: validatedData.data.id });
    if (existing) {
      return {
        error: { id: ['An employee with this ID already exists'] },
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...insertData } = validatedData.data as Record<string, unknown>;
    await collection.insertOne(insertData as Document);
    
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: { _form: ['Failed to add employee to database'] } };
  }
}

export async function addDepartment(formData: FormData) {
  const rawData = {
    id: formData.get('id'),
    name: formData.get('name'),
    floor: parseInt(formData.get('floor') as string),
  };

  const validatedData = DepartmentSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      error: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const client = await connectToDatabase();
    const collection = client.db(DATABASE_NAME).collection('departments');
    
    const existing = await collection.findOne({ id: validatedData.data.id });
    if (existing) {
      return {
        error: { id: ['A department with this ID already exists'] },
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...insertData } = validatedData.data as Record<string, unknown>;
    await collection.insertOne(insertData as Document);
    
    revalidatePath('/departments');
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: { _form: ['Failed to add department to database'] } };
  }
}
