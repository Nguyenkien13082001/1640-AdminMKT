import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import {formatDate} from "../../service/formatDate"
import { fetchAllFaculty } from '../../service/userService';

const ModalAdd = (props) => {

    const { show, handleClose, handleAddNewEvent } = props
    const [listFaculty, setListFaculty] = useState([])

    const [data, setData] = useState({
        event_name: "",
        event_description: "",
        faculty: "",
        first_closure_date: "",
        final_closure_date: "",
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const getAllFaculty = async () => {
        let res = await fetchAllFaculty()
        if (res) {
            setListFaculty(res.data)

        }
    }
    useEffect(() => {
        getAllFaculty()
    }, [])

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>New Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add">
                    <div className="mb-3">
                        <label className="form-label">Event's Name</label>
                        <input 
                            type="text"
                            className="form-control" required
                            name="event_name"
                            value={data.event_name && data.event_name} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Event's Description</label>
                        <input 
                            type="text"
                            className="form-control" required
                            name="event_description"
                            value={data.event_description && data.event_description} 
                            onChange={handleChange}
                        />
                    </div>
                    <select className="form-select" required value={data.faculty} name='faculty' onChange={handleChange}>
                        {listFaculty && listFaculty.map((faculty) => {
                            return <option key={faculty._id} value={faculty._id}>{faculty.faculty_name}</option>
                        })}
                    </select>
                    <div className="mb-3">
                        <label className="form-label">Date start</label>
                        <input 
                            type="date" 
                            className="form-control"
                            name="first_closure_date"
                            value={data.first_closure_date && formatDate(new Date(data.first_closure_date))} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Deadline of event</label>
                        <input 
                            type="date" 
                            className="form-control"
                            name="final_closure_date"
                            value={data.final_closure_date && formatDate(new Date(data.final_closure_date))} 
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleAddNewEvent(data)}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAdd