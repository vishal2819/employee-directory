import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { AddEmployeeProvider } from "@/components/AddEmployeeContext";
import AddEmployeeFormWrapper from "@/components/AddEmployeeFormWrapper";
import { getDepartments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Employee Directory",
  description: "Enterprise-grade Employee Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const departments = await getDepartments();

  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <AddEmployeeProvider initialDepartments={departments}>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
          <AddEmployeeFormWrapper />
        </AddEmployeeProvider>
      </body>
    </html>
  );
}
