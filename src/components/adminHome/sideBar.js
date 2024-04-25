import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({openSidebarToggle, OpenSidebar}) => {
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
                    <a href="/admin/event">
                    <i className="fa-solid fa-calendar-days icon"></i> Manage Event
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/admin">
                        <i className="fa-solid fa-users icon"></i> Manage Accounts
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/admin/faculty">
                        <i className="fa-solid fa-folder icon"></i> Manage Faculties
                    </a>
                </li>
                <li className='sidebar-list-item' style={{color: "#fff"}}>
                    <a onClick={() => {
                        localStorage.clear()
                        navigate('/')
                    }}>
                        <i className="fa-solid fa-right-from-bracket icon"></i> Logout
                    </a>
                </li>
            </ul>
        </aside>
        </>
    )
}

export default SideBar