const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const DATABASE_NAME = 'employee_directory';

const departments = [
  { id: 'eng', name: 'Engineering', floor: 4 },
  { id: 'hr', name: 'Human Resources', floor: 2 },
  { id: 'sales', name: 'Sales', floor: 3 },
  { id: 'mkt', name: 'Marketing', floor: 3 },
  { id: 'exec', name: 'Executive', floor: 10 },
];

const employees = [
  { 
    id: 'EMP001',
    name: 'Alice Johnson', 
    position: 'Senior Software Engineer', 
    department: 'Engineering',
    departmentId: 'eng',
    salary: 120000, 
    email: 'alice@example.com',
    joinDate: new Date('2022-01-15')
  },
  { 
    id: 'EMP002',
    name: 'Bob Smith', 
    position: 'HR Manager', 
    department: 'Human Resources', 
    departmentId: 'hr',
    salary: 95000, 
    email: 'bob@example.com',
    joinDate: new Date('2021-06-20')
  },
  { 
    id: 'EMP003',
    name: 'Charlie Brown', 
    position: 'Sales Representative', 
    department: 'Sales', 
    departmentId: 'sales',
    salary: 80000, 
    email: 'charlie@example.com',
    joinDate: new Date('2023-03-10')
  },
  { 
    id: 'EMP004',
    name: 'Diana Prince', 
    position: 'Marketing Lead', 
    department: 'Marketing', 
    departmentId: 'mkt',
    salary: 110000, 
    email: 'diana@example.com',
    joinDate: new Date('2022-11-05')
  },
  { 
    id: 'EMP005',
    name: 'Edward Norton', 
    position: 'CTO', 
    department: 'Executive', 
    departmentId: 'exec',
    salary: 250000, 
    email: 'edward@example.com',
    joinDate: new Date('2020-01-01')
  }
];

async function seed() {
  if (!uri) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DATABASE_NAME);
    
    // Seed Departments
    const deptCollection = db.collection('departments');
    await deptCollection.deleteMany({});
    console.log('Cleared existing departments');
    await deptCollection.insertMany(departments);
    console.log('Seeded departments successfully');

    // Seed Employees
    const empCollection = db.collection('employees');
    await empCollection.deleteMany({});
    console.log('Cleared existing employees');
    await empCollection.insertMany(employees);
    console.log('Seeded employees successfully');

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
