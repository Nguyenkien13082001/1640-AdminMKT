import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addNewAccount, fetchAllFaculty } from "../../service/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditAccount = (props) => {
  const { show, handleClose, handleAccountEdit, dataEditAccount } = props;
  const [showImage, setShowImage] = useState();
  const [userData, setUserData] = useState(dataEditAccount);
  const [listFaculty, setListFaculty] = useState([]);

  useEffect(() => {
    setUserData(dataEditAccount);
    setShowImage(dataEditAccount.image || "");
  }, [dataEditAccount]);

  const getAllFaculty = async () => {
    let res = await fetchAllFaculty();
    if (res) {
      setListFaculty(res.data);
    }
  };
  useEffect(() => {
    getAllFaculty();
  }, []);

  console.log(dataEditAccount)
  useEffect(() => {
    setUserData({
      ...dataEditAccount,
      faculty: dataEditAccount.faculty ? dataEditAccount.faculty._id : ''
    }
    )
  }, [dataEditAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = function () {
      setShowImage(reader.result);
      setUserData({ ...userData, image: file.target.files[0] });
    };
    console.log("check image nè", file.target.files[0]);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              required
              className="form-control"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              name="password"
              className="form-control"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <select
            className="form-select"
            required
            value={userData.faculty}
            name="faculty"
            onChange={handleChange}
          >
            {listFaculty &&
              listFaculty.map((faculty) => {
                return (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.faculty_name}
                  </option>
                );
              })}
          </select>
          <br />
          <select
            className="form-select"
            value={userData.role}
            name="role"
            onChange={handleChange}
          >
            <option value={"student"}>Student</option>
            <option value={"admin"}>Admin</option>
            <option value={"marketing manager"}>Marketing Manager</option>
            <option value={"marketing coordinator"}>
              Marketing Coordinator
            </option>
          </select>

          <div className="mb-3">
            <h1 className="form-label">Image</h1>
            <label
              htmlFor="formFile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
                overflow: "hidden",
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="d-flex align-items-center justify-content-center border"
            >
              {showImage ? <img src={showImage} alt="" /> : "+"}
            </label>
            <input
              className="form-control d-none"
              type="file"
              id="formFile"
              name="image"
              onChange={handleImage}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleAccountEdit(userData);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAccount;
