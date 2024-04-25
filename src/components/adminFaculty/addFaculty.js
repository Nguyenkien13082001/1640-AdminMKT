import { memo, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addNewAccount } from "../../service/userService";
import { toast } from "react-toastify";

const AddFaculty = (props) => {
    const { show, handleClose, handleAddNewFaculty } = props
    const [data, setData] = useState({
        "faculty_name": "",
        // "phone": "",
        // "email": "",
        // "password": "",
        // "dateOfBirth": "",
        // "gender": "female",
        // "role": "customer",
    })

    const handleChange = (e) => {
        setData({ ...data, faculty_name: e.target.value })
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Faculty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-edit">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control"
                            value={data.faculty_name && data.faculty_name} 
                            onChange={handleChange}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAddNewFaculty(data)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(AddFaculty)