import { memo, useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditFaculty = (props) => {
    const { show, handleClose, dataEditAccount, handleAccountEdit } = props
    const [data, setData] = useState(dataEditAccount)

    const handleChange = (e) => {
        setData({ ...data, faculty_name: e.target.value })
    }
    useEffect(() => {
        if (dataEditAccount) {
            setData(dataEditAccount)
        }
    }, [dataEditAccount])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Faculty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-edit">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" value={data.faculty_name} onChange={handleChange} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAccountEdit(data)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(EditFaculty)