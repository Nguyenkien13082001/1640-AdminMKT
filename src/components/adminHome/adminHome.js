import React, { useEffect, useState } from "react";
import "../../style/adminHome.css"
import { fetchAllPost } from "../../service/userService";
import { BsArrowReturnRight, BsFileEarmarkBinaryFill } from "react-icons/bs";

const AdminHome = () => {

    const [listPost, setListPost] = useState({})
    const [isLike, setIsLike] = useState()
    const [isShowComment, setIsShowComment] = useState()

    const getAllPost = async () => {
        const token = localStorage.getItem("accessToken")
        let res = await fetchAllPost(token)
        if (res) {
            setListPost(res)
        }
        console.log(">>>check post", res);
    }

    useEffect(() => {
        getAllPost()
    }, [])


    return (
        <div className="home-container">
            <div className="title">
                <h1>Welcome {localStorage.getItem("name")} to Marketing Manager Home</h1>
                <h4>Have a good day!</h4>
            </div>
            {/* <div className="classify">
                <div className="top-classify">
                    <h5>Classify</h5>
                </div>
                <div className="bot-classify">
                    <select className="form-select">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select className="form-select">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select className="form-select">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div> */}
            {
                listPost && listPost.length > 0 &&
                listPost.map((item) => {
                    return (
                        <div className="event">
                            <div className="avatar">
                                <i style={{fontSize: "25px", paddingRight: "10px"}} className="fa-solid fa-circle-user"></i>
                                {localStorage.getItem("name")}
                            </div>
                            <div className="category">
                                <div>Title: {item.caption}</div>
                            </div>
                            <div className="event-body">
                                <div className="event-content">
                                    <div className="avatarU">
                                        <i style={{fontSize: "25px"}} className="fa-solid fa-circle-user"></i> 
                                        <div className="user-create">
                                            <div className="user">{item.user.name}</div> 
                                            <div className="create">Create: {item.created_at}</div>
                                        </div>
                                    </div>
                                    <p>{item.description}</p>
                                    <div>
                                        <BsArrowReturnRight/><a href={item.file ? item.file : "#"}><BsFileEarmarkBinaryFill/>File name</a>
                                    </div>
                                    <div className="imagePost">
                                        <img style={{width: "300px", height: "450px"}} className="img-thumbnail" src={item.image}/>
                                    </div>
                                    <div className="like-comment">
                                        <div className="iconReact">
                                            <i style={{cursor: "pointer"}} className={isLike === true ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}
                                                onClick={() => setIsLike(!isLike)}
                                            ></i> {item.likes}
                                        </div>
                                        <div className="iconReact" style={{paddingLeft: "8px"}}>
                                            <i className="iconReact fa-regular fa-comment"></i> {item.comments_list.length}
                                        </div>
                                    </div>
                                </div>
                                <div className="event-comment">
                                    <i className=" fa-solid fa-circle-user icon_event"></i>
                                    <div className="comment mb-3">
                                        <textarea className="form-control" placeholder="Write comment here..."></textarea>
                                    </div>
                                    <i className="fa-solid fa-paper-plane" style={{ paddingTop: "15px" }}></i>
                                </div>
                                {item.comments_list && item.comments_list.length > 0 && item.comments_list.map((comment) =>
                                    {return (
                                        <div>
                                            <div className="user-createAt">
                                                <div className="user" ><b>{comment.user.name}</b></div>
                                                {isShowComment && <div className="createAt">{comment.created_at}</div>}
                                                <i className= {isShowComment === true ? "fa-solid fa-caret-down" :"fa-solid fa-caret-up"} onClick={() => setIsShowComment(!isShowComment)} style={{paddingTop: "5px", paddingLeft: "5px"}}></i>
                                            </div>
                                            {isShowComment && <div style={{ paddingLeft: "60px" }} ><BsArrowReturnRight style={{paddingBottom: "1px"}}/> {comment.comment}</div>}
                                        </div>
                                    )}
                                )}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminHome