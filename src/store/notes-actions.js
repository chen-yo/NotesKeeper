import { notesActions } from "./notes";
import { errorsActions } from "./errors";
import axios from 'axios'

export function getNotes() {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const notes = await axios.get("/notes");
      dispatch(notesActions.setNotes(notes.data));
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
      dispatch(notesActions.setLoading(false));
    }
  };
}

export function getNote(noteId) {
  return async (dispatch) => {
    try {
      let note =  await axios.get(`/notes/${noteId}`);
      return note.data;
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
      dispatch(notesActions.setLoading(false));
    }
  };
}

export function deleteNote(noteId) {
  return async (dispatch) => {
    try {
       await axios.delete(`/notes/${noteId}`);
       dispatch(getNotes())
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
    }
  };
}

export function updateNote(note) {
  return async (dispatch) => {
    try {
      const updated = await axios.put('/notes', note);
      dispatch(notesActions.updateNote(updated.data))
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    }
  }
}

export function addNote(note) {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const added = await axios.post("/notes", note );
      dispatch(getNotes());
      dispatch(notesActions.setLoading(false));
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
      dispatch(notesActions.setLoading(false));
    }
  };
}
