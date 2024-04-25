import axios from "./customize-axios";

const fetchAllPost = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
  };
  return axios.get("https://comp1640.pythonanywhere.com/all_posts", {
    headers,
  });
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const fetchAllUser = (currentPage, accountsPerPage) => {
  return axios.get("/all-user", {
    params: { page: currentPage, limit: accountsPerPage },
    ...getAuthHeaders(),
  });
};

const addNewAccount = (userData) => {
  return axios.post("/create-user", userData, getAuthHeaders());
};

const editAccount = (userData) => {
  return axios.put("/update-user", userData, getAuthHeaders());
};

const deleteAccount = (_id) => {
  return axios.delete(`/delete-user/${_id}`, getAuthHeaders());
};

const fetchAllFaculty = () => {
  return axios.get("/all-faculty", getAuthHeaders());
};

const addNewFaculty = (userData) => {
  return axios.post("/create-faculty", userData, getAuthHeaders());
};

const editFaculty = (userData) => {
  return axios.put("/update-faculty", userData, getAuthHeaders());
};

const deleteFaculty = (userId) => {
  return axios.delete(`/delete-faculty/${userId}`, getAuthHeaders());
};

const fetchAllEvent = () => {
  return axios.get("/all-event", getAuthHeaders());
};

const fetchAllCountEvent = () => {
  return axios.get("/count-event", getAuthHeaders());
};

const addNewEvent = (userData) => {
  return axios.post("/create-event", userData, getAuthHeaders());
};

const editEvent = (userData) => {
  return axios.put("/update-event", userData, getAuthHeaders());
};

const deleteEvent = (eventId) => {
  return axios.delete(`/delete-event/${eventId}`, getAuthHeaders());
};

const loginApi = (email, password) => {
  return axios.post("/login", { email, password });
};

const fetchDataFaculty = () => {
  return axios.get("/count-by-faculty", getAuthHeaders());
};

const fetchData = () => {
  return axios.get("/post-percentages-by-faculty", getAuthHeaders());
};

const downloadPost = () => {
  return axios.get("/downloadPostAsZip", getAuthHeaders());
};

const userDownload = () => {
  return axios.get("/users-with-posts", getAuthHeaders());
};

const chart = () => {
  return axios.get("/event-statistic", getAuthHeaders());
};

const fetchAllPostCoordinator = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
  };
  return axios.get(
    "https://comp1640.pythonanywhere.com/load_posts_cordinator",
    {
      headers,
    }
  );
};

const search = (name) => {
  return axios.get(`/search?name=${name}`, getAuthHeaders());
};

const approvedPost = (postId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
  };
  // Cập nhật cách truyền tham số cho axios.post
  return axios.post(
    `https://comp1640.pythonanywhere.com/approve_post`,
    {
      post_id: postId, // Dữ liệu cần gửi trong body của POST request
    },
    {
      headers: headers, // Truyền header qua tham số thứ ba của axios.post
    }
  );
};

const CommentPending = async (Postid, token, commentText) => {
  const headers = {
    Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
  };

  return axios.post(
    `https://comp1640.pythonanywhere.com/add_comment_pending`,
    {
      post: Postid,
      comment: commentText, // Dữ liệu cần gửi trong body của POST request
    },
    {
      headers: headers, // Truyền header qua tham số thứ ba của axios.post
    }
  );
};

export {
  fetchAllUser,
  addNewAccount,
  editAccount,
  deleteAccount,
  fetchAllFaculty,
  addNewFaculty,
  deleteFaculty,
  editFaculty,
  fetchAllEvent,
  addNewEvent,
  fetchAllCountEvent,
  editEvent,
  deleteEvent,
  loginApi,
  fetchAllPost,
  fetchDataFaculty,
  fetchData,
  downloadPost,
  userDownload,
  chart,
  fetchAllPostCoordinator,
  search,
  approvedPost,
  CommentPending,
};
