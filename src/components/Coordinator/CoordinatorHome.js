import React, { useEffect, useState } from "react";
import "../../style/coordinator.css";
import {
  fetchAllPostCoordinator,
  approvedPost,
  CommentPending,
} from "../../service/userService";

import { TiTickOutline } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

export default function CoordinatorHome() {
  const [listPost, setListPost] = useState([]);
  const [isLike, setIsLike] = useState();
  const [isShowComment, setIsShowComment] = useState();
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false); // State để kiểm soát việc hiển thị ô nhập

  const getAllPost = async () => {
    const token = localStorage.getItem("accessToken");
    let res = await fetchAllPostCoordinator(token);
    if (res) {
      setListPost(res);
    }
    console.log(">>>check post", res);
  };

  const toggleCommentBox = () => {
    setIsCommenting(!isCommenting);
  };

  const handleApproved = async (Postid) => {
    const token = localStorage.getItem("accessToken");
    let res = await approvedPost(Postid, token);
    if (res) {
      console.log(">>>check res", res);
      getAllPost();
    }
  };

  const handleCommentSubmit = async (postId) => {
    const token = localStorage.getItem("accessToken");
    let res = await CommentPending(postId, token, commentText[postId]);
    if (res) {
      console.log(">>>check res", res);
      setCommentText("");
      getAllPost();
    }
  };

  const handleCommentInputChange = (event, postId) => {
    const { value } = event.target;
    setCommentText({ ...commentText, [postId]: value });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  console.log(">>>check post1112", listPost);

  const renderComments = (postId, commentsList) => {
    return commentsList.map((comment) => (
      <div key={comment._id} className="comment">
        <b className="comment-author">{comment.user.name} :</b>
        <div>
          <p className="comment-text">{comment.comment}</p>
          <p className="comment-time">{comment.created_at}</p>
        </div>
      </div>
    ));
  };
  return (
    <div className="coordinator">
      <div className="title">
        <h1>
          Welcome {localStorage.getItem("name")} to Marketing Coordinator Home
        </h1>
        <h4>Have a good day!</h4>
      </div>

      <div className="Blog">
        <div className="content">
          <div className="post-container">
            {listPost &&
              listPost.map((listPost) => {
                return (
                  <div className="post" key={listPost.id}>
                    <h4 style={{ textAlign: "center", color: "#4498df" }}>
                      Event: {listPost.event_name}
                    </h4>

                    <div className="post-header">
                      <h2>
                        Author:{" "}
                        {listPost.is_anonymous
                          ? "Anonymous"
                          : listPost.user.name}
                      </h2>
                      {listPost.status === "pending" && (
                        <Button
                          onClick={() => handleApproved(listPost._id)}
                          variant="outline-primary"
                        >
                          Approved
                        </Button>
                      )}
                    </div>
                    <p>{listPost.content}</p>
                    <span>Time: {listPost.created_at}</span>
                    <hr />

                    <div
                      style={{
                        display: "grid",
                      }}
                    >
                      {listPost.file !== "null" &&
                        listPost.file
                          .split(",")
                          .map((file) => (
                            <a href={file}>
                              {file.substring(file.lastIndexOf("/") + 1)}
                            </a>
                          ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {listPost.image !== "null" &&
                        listPost.image !== "" &&
                        listPost.image.split(",").map((image) => (
                          <img
                            style={{
                              width: "300px",
                              height: "400px",
                              margin: "10px",
                            }}
                            src={image}
                            alt=""
                          />
                        ))}
                    </div>

                    {listPost.status === "pending" && (
                      <div className="post-interaction">
                        <button onClick={toggleCommentBox}>
                          <FontAwesomeIcon icon={faComment} /> Comment
                        </button>
                        <hr />
                      </div>
                    )}

                    {isCommenting && listPost.status === "pending" && (
                      <form
                        style={{ marginTop: "10px", display: "flex" }}
                        className="cmt"
                      >
                        <div style={{ width: "100%" }}>
                          <textarea
                            value={commentText[listPost._id] || ""}
                            onChange={(event) =>
                              handleCommentInputChange(event, listPost._id)
                            }
                            className="comment-input"
                            placeholder="Write a comment..."
                          ></textarea>
                        </div>

                        <div>
                          <button
                            type="button"
                            className="comment-buttont"
                            onClick={() => handleCommentSubmit(listPost._id)}
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </div>
                        <hr />
                      </form>
                    )}

                    {isCommenting && listPost.status === "pending" && (
                      <div className="post-content">
                        {listPost.comments_list.length > 0 && (
                          <div className="comments-container">
                            {renderComments(
                              listPost._id,
                              listPost.comments_list
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
