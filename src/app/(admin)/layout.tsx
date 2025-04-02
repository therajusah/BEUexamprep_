import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="admin-layout">
      {children}
      <Toaster />
    </div>
  );
};

export default AdminLayout; 