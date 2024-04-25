import React from "react";
import { useState } from "react"
import "../style/layoutAdmin.css"
import SideBarManager from "../components/marketing/sideBarMarketing";

const LayoutMarketing = ({children}) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return(
        <>
            <div className="grid-container">
                {/* <HeaderAdmin OpenSidebar={OpenSidebar}/> */}
                <SideBarManager openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
                {children}
            </div>
        </>
    )
}

export default LayoutMarketing