import React from "react";
import { useState } from "react";
import "../style/layoutAdmin.css"
import SideBarCoordinator from "../components/Coordinator/SideBarCoordinator";

export default function LayoutCoordinator({ children }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        {/* <HeaderAdmin OpenSidebar={OpenSidebar} /> */}
        <SideBarCoordinator
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        {children}
      </div>
    </>
  );
}
