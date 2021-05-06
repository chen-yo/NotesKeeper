import { React, useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import { getNote, updateNote } from "../store/notes-actions";
import { useDispatch } from "react-redux";

export default function EditNote() {
  let { noteId } = useParams();
  noteId = parseInt(noteId);
  const history = useHistory();
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(null);

  function handleClose() {
    history.push("/notes");
  }

  // load edited note
  useEffect(() => {
    dispatch(getNote(noteId)).then((n) => {
      setEdit(n)
    });
  }, [noteId, dispatch]);


  function handleEdit(modifiedNote) {
    dispatch(updateNote(modifiedNote))
    history.push("/notes");
  }

  return (
    <>
      {edit && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <NoteForm onSubmit={handleEdit} note={edit} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
