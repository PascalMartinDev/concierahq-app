import React from "react";
import { Outlet } from "react-router-dom";

// Component Template
const MainAuth: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainAuth;