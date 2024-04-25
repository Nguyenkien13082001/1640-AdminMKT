import React, { useEffect } from "react";
import AdminHome from "../components/adminHome/adminHome"
import LayoutMarketing from "../layouts/layoutMarketing";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";

const Admin = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') != "marketing manager") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return(
        <LayoutMarketing>
            <AdminHome/>
        </LayoutMarketing>
    )
}

export default Admin