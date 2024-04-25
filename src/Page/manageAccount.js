import React, {useEffect} from "react";
import LayoutAdmin from "../layouts/layoutAdmin";
import Account from "../components/ManageAccount/ManageAccount";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const ManageAccount = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') != "admin") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return(
        <LayoutAdmin>
            <Account/>
        </LayoutAdmin>
    )
}

export default ManageAccount