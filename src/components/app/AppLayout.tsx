import React from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";

// Component Template
const AppLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default AppLayout;