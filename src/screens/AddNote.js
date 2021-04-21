import React from 'react'
import { Modal, Button } from "react-bootstrap";

function handleClose() {
   // history.push('/notes')
}

export default function AddNote() {
    return (
        <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
