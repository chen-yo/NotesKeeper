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
