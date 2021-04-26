import { React, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks";
import NoteForm from "./NoteForm";
import * as actions from '../utils/actions'
import {updateNote} from '../context/note-context'

export default function EditNote() {
  const { run, isLoading, data: note, isSuccess, isError } = useAsync();
  let { noteId } = useParams();
  noteId = parseInt(noteId);
  const history = useHistory();
  const [, dispatch] = useAppContext();


  function handleClose() {
    history.push("/notes");
  }

  useEffect(() => {
    const getNote = (noteId) => {
      return client(`notes/${noteId}`);
    };

    run(getNote(noteId));
  }, [noteId, run]);

  function handleEdit(modifiedNote) {
    // run(updateNote(modifiedNote)).then((n=>actions.updateNote(dispatch, n)).then(()=>history.push('/notes'))
    updateNote(dispatch, modifiedNote).then(()=>history.push("/notes"))
  }

  return (
    <>
      {isSuccess && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {note.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NoteForm onSubmit={handleEdit} note={note} />
          </Modal.Body>
        </Modal>
      )}
      {isLoading && (
        <Modal show={true}>
          <Modal.Body>
            <span>Loading...</span>
          </Modal.Body>
        </Modal>
      )}
      {
        isError && 
      <span>Faild to load note with id: {noteId}</span>

      }
    </>
  );
}
