import { client } from "../utils/api-client";
import { notesActions } from "./notes";

export function getNotes() {
  return async (dispatch) => {
    dispatch(notesActions.setLoading(true));
    try {
      const notes = await client("notes");
      dispatch(notesActions.setNotes(notes));
    } catch (error) {
      // trigger error
    } finally {
      dispatch(notesActions.setLoading(false));
    }
  };
}

export function addNote(note) {
  return async dispatch => {
    dispatch(notesActions.setLoading(true))
    try{
      const added = await client("notes", { data: note });
      dispatch(getNotes())
      dispatch(notesActions.setLoading(false))
    }catch(error) {

    }finally {
      dispatch(notesActions.setLoading(false))
    }
  }
}
