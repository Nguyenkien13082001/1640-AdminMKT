import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { formatDate } from '../../service/formatDate';
import { fetchAllFaculty } from '../../service/userService';

const ModalEdit = (props) => {

    const {show, handleClose, dataEditAccount, handleEventEdit} = props
    const [data, setData] = useState(dataEditAccount)
    const [listFaculty, setListFaculty] = useState([])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (dataEditAccount) {
            setData(dataEditAccount)
        }
    }, [dataEditAccount])

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
            <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-edit">
                    <div className="mb-3">
                        <label className="form-label">Event Name</label>
                        <input 
                        type="text" 
                        className="form-control"
                        name="event_name"
                        value={data.event_name} 
                        onChange={handleChange}/>
                    </div>
                    <select className="form-select" required value={data.faculty} name='faculty' onChange={handleChange}>
                        {listFaculty && listFaculty.map((faculty) => {
                            return <option key={faculty._id} value={faculty._id}>{faculty.faculty_name}</option>
                        })}
                    </select>
                    <br/>
                    <div className="mb-3">
                        <label className="form-label">Event Description</label>
                        <input 
                        type="text" 
                        className="form-control"
                        name="event_description"
                        value={data.event_description} 
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date start</label>
                        <input 
                        type="date"
                        className="form-control"
                        name="first_closure_date"
                        value={formatDate(new Date(data.first_closure_date))} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Deadline of event</label>
                        <input 
                        type="date" 
                        className="form-control"
                        name="final_closure_date"
                        value={formatDate(new Date(data.final_closure_date))} onChange={handleChange}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleEventEdit(data)}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit