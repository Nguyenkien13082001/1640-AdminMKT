import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {

    const {show, handleClose, dataEventDelete, handleAccountDelete} = props

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Accounts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataEventDelete.event_name}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleAccountDelete(dataEventDelete)}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDelete