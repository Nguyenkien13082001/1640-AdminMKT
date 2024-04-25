import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const DeleteAccount = (props) => {

    const {show, handleClose, dataUserDelete, handleAccountDelete} = props

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Accounts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-delete">
                    This action can't be undo!
                    Do you want to delete <b>{dataUserDelete.name}</b>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={() => handleAccountDelete(dataUserDelete)}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAccount