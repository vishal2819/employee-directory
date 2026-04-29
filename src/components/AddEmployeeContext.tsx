'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AddEmployeeContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  departments: any[];
}

const AddEmployeeContext = createContext<AddEmployeeContextType | undefined>(undefined);

export function AddEmployeeProvider({ 
  children,
  initialDepartments 
}: { 
  children: ReactNode;
  initialDepartments: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [departments] = useState<any[]>(initialDepartments);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <AddEmployeeContext.Provider value={{ isOpen, openDialog, closeDialog, departments }}>
      {children}
    </AddEmployeeContext.Provider>
  );
}

export function useAddEmployee() {
  const context = useContext(AddEmployeeContext);
  if (!context) {
    throw new Error('useAddEmployee must be used within AddEmployeeProvider');
  }
  return context;
}
