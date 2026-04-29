import { connectToDatabase } from './mongodb';
import { Department, Employee, EmployeeWithDepartment } from './schema';
import { unstable_cache } from 'next/cache';

const DATABASE_NAME = 'employee_directory';

export const getDepartments = unstable_cache(
  async (): Promise<Department[]> => {
    const client = await connectToDatabase();
    const collection = client.db(DATABASE_NAME).collection('departments');
    const departments = await collection.find({}).toArray();
    return departments.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
    })) as unknown as Department[];
  },
  ['departments'],
  { tags: ['departments'] }
);

export async function getEmployees(departmentId?: string): Promise<Employee[]> {
  const client = await connectToDatabase();
  const collection = client.db(DATABASE_NAME).collection('employees');
  
  const query = departmentId ? { departmentId } : {};
  const employees = await collection.find(query).toArray();
  
  return employees.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
  })) as unknown as Employee[];
}

export async function getEmployeeById(id: string): Promise<EmployeeWithDepartment | null> {
  const client = await connectToDatabase();
  const collection = client.db(DATABASE_NAME).collection('employees');

  const pipeline = [
    { $match: { id: id } },
    {
      $lookup: {
        from: 'departments',
        localField: 'departmentId',
        foreignField: 'id',
        as: 'department'
      }
    },
    { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } }
  ];

  const results = await collection.aggregate(pipeline).toArray();
  
  if (results.length === 0) return null;

  const doc = results[0];
  return {
    ...doc,
    _id: doc._id.toString(),
    department: doc.department ? {
      ...doc.department,
      _id: doc.department._id.toString()
    } : undefined
  } as unknown as EmployeeWithDepartment;
}
