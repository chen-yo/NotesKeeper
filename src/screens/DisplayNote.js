import {React, useState} from "react";
import { Modal, Button } from "react-bootstrap";
import {useHistory, useParams} from 'react-router-dom'
import { useAppContext } from "../appdata";

export default function DisplayNote() {

    let { noteId } = useParams();
    noteId = parseInt(noteId)
    const history = useHistory()
    const [state, dispatch] = useAppContext()

    const {title, body, priority, read, color, icon} = state?.notes.find(note => note.id === noteId)

    function handleClose() {
        history.push('/notes')
    }

    return (
      <>
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit {title}
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
      </>
    );
  }
