import React from "react";
import { useNavigate } from "react-router-dom";

const SideBarManager = ({openSidebarToggle, OpenSidebar, children}) => {
    const navigate = useNavigate()
    return(
        <>
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <i className="fa-solid fa-film icon_header"></i> Greenwich Blog
                </div>
                <span className='icon close_icon' onClick={OpenSidebar} >X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="/marketing/home">
                        <i className="fa-solid fa-house icon"></i> Home
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/marketing/dashboard">
                        <i className="fa-solid fa-chart-simple"></i> DashBoard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/marketing">
                        <i className="icon fa-solid fa-download"></i> Download file
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a style={{color: "#fff"}} onClick={() => {
                        localStorage.clear()
                        navigate('/')
                    }}>
                        <i className="fa-solid fa-right-from-bracket icon"></i> Log out
                    </a>
                </li>
            </ul>
        </aside>
        </>
    )
}

export default SideBarManager