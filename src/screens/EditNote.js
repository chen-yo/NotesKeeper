import { React, useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import { getNote, updateNote } from "../store/notes-actions";
import { useDispatch } from "react-redux";

export default function EditNote() {
  let { noteId } = useParams();
  noteId = parseInt(noteId);
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    noteToEdit: null,
    save: false,
    updated: null
  });

  const {noteToEdit, save} = state

  function handleClose() {
    history.push("/notes");
  }

  // load edited note
  useEffect(() => {
    dispatch(getNote(noteId)).then((n) => {
      setState(prev => ({...prev, noteToEdit: n}))
    });
  }, [noteId, dispatch]);

  // Save edited note
  useEffect(() => {
    if(save) {
      dispatch(updateNote(state.updated))
      // setState(prev => ({...prev, save: false, updated: null}))
      history.push("/notes");
    } 
  }, [save, dispatch]);

  function handleEdit(modifiedNote) {
    setState(prev => ({...prev, updated: modifiedNote, save: true}))
  }

  return (
    <>
      {noteToEdit && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Edit {noteToEdit.title}</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <NoteForm onSubmit={handleEdit} note={noteToEdit} />
          </Modal.Body>
        </Modal>
      )}
      {/* {isLoading && (
        <Modal show={true}>
          <Modal.Body>
            <span>Loading...</span>
          </Modal.Body>
        </Modal>
      )}
      {
        isError && 
      <span>Faild to load note with id: {noteId}</span>

      } */}
    </>
  );
}
