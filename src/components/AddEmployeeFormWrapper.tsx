'use client';

import { useAddEmployee } from './AddEmployeeContext';
import AddEmployeeForm from './AddEmployeeForm';

export default function AddEmployeeFormWrapper() {
  const { isOpen, closeDialog, departments } = useAddEmployee();

  return (
    <AddEmployeeForm 
      departments={departments} 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }} 
    />
  );
}
