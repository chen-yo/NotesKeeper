import { notesActions } from "./notes";
import { errorsActions, handleErrors2 } from "../../store/errorsSlice";
import axios from 'axios'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getNotes() {
  return async (dispatch) => {
    dispatch(notesActions.loadNotesStart());
    delay(2000).then(()=> {
      axios
      .get("/api/notes")
      .then((res) => {
        dispatch(notesActions.loadNotesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(notesActions.loadNotesFail());
        dispatch(errorsActions.setUnhandled(error));
      });
    })
    
  };
}

export function getNote(noteId, dispatch) {
    dispatch(notesActions.loadNoteStart());
    return delay(2000).then(()=>axios
        .get(`/api/notes/${noteId}`)
        .then((res) => {
          let note = res.data;
          dispatch(notesActions.loadNoteSuccess());
          return note;
        })
        .catch((error) => {
          dispatch(notesActions.loadNoteFail());
          // handleErrors2(error);
        }));
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
      }).catch(handleErrors2)
  
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
