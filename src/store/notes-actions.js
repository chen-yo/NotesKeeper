import { client } from "../utils/api-client";
import { notesActions } from "./notes";
import { errorsActions } from "./errors";

export function getNotes() {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const notes = await client("notes");
      dispatch(notesActions.setNotes(notes));
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
      return await client(`notes/${noteId}`);
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
       await client(`notes/${noteId}`, {method: 'DELETE'});
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
      const updated = await client('notes', {data: note, headers: {method: 'PUT'}});
      dispatch(notesActions.updateNote(updated))
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    }
  }
}

export function addNote(note) {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const added = await client("notes", { data: note });
      dispatch(getNotes());
      dispatch(notesActions.setLoading(false));
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
      dispatch(notesActions.setLoading(false));
    }
  };
}
