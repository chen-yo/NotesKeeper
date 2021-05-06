import { notesActions } from "./notes";
import { errorsActions } from "./errors";
import axios from 'axios'
import {handleErrors} from './errors-actions'

export function getNotes() {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const notes = await axios.get("/api/notes");
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
      let note =  await axios.get(`/api/notes/${noteId}`);
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
       await axios.delete(`/api/notes/${noteId}`);
       dispatch(getNotes())
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
    }
  };
}

export function updateNote(note) {
  return async (dispatch) => {
      dispatch(errorsActions.clearErrors())
      axios.put('/api/notes', note).then(res => {
        let note = res.data
        dispatch(notesActions.updateNote(note))
      }).catch(handleErrors)
  
  }
}

export function addNote(note) {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const added = await axios.post("/api/notes", note );
      dispatch(getNotes());
      dispatch(notesActions.setLoading(false));
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
      dispatch(notesActions.setLoading(false));
    }
  };
}
