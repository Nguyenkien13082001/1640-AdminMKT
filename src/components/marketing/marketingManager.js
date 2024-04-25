import React, { useEffect, useState } from "react"
import "../../style/marketingDownload.css"
import { BiSolidDownvote } from "react-icons/bi";
import { userDownload } from "../../service/userService";
import Table from "react-bootstrap/Table"

const MarketingManager = () => {

    const [listUser, setListUser] = useState([])

    const getFile = async() => {
        let res = await userDownload()
        if (res) {
            setListUser(res)
        }
    }

    useEffect(() => {
        getFile()
    }, [])

    return(
        <>
        <div className="download-container">
            <div className="download-body">
                <div className="download-title">
                    <h2>Download all file here</h2>
                </div>
                <BiSolidDownvote/>
                <div className="but">
                    <a href="https://magazine-web-670c.onrender.com/downloadPostsAsZip"><button className="btn btn-primary"><i className="fa-solid fa-download"></i> Download All</button></a>
                </div>
            </div>
            <div className="table-account">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th style={{textAlign: "center"}}>Post ID</th>
                        <th style={{textAlign: "center"}}>User</th>
                        <th style={{textAlign: "center"}}>Create</th>
                        <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUser && listUser.length > 0 &&
                            listUser.map((item, index) => {
                                return(
                                    <tr key={`faculty-${index}`}>
                                        <td style={{textAlign: "center"}}>{item.PostID}</td>
                                        <td style={{textAlign: "center"}}>{item.User.name}</td>
                                        <td style={{textAlign: "center"}}>{item.CreatedAt}</td>
                                        <td>
                                            <div className="button-action">
                                                <a href={`https://magazine-web-670c.onrender.com/downloadAPosts/${item.PostID}`} className="btn btn-primary">Download</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
        </>
    )
}

export default MarketingManager