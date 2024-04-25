import React from "react";
import { useState } from "react"
import HeaderAdmin from "../components/adminHome/headerAdmin"
import SideBar from "../components/adminHome/sideBar"
import "../style/layoutAdmin.css"

const LayoutAdmin = ({children}) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return(
        <>
            <div className="grid-container">
                {/* <HeaderAdmin OpenSidebar={OpenSidebar}/> */}
                <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
                {children}
            </div>
        </>
    )
}

export default LayoutAdmin