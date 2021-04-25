import service from './main-service'

export async function updateNote(dispatch, note) {
    // dispatch({type: 'UPDATE_NOTE_START', note})
    try {
      const updateNote = await service.updateNote(note)
      dispatch({type: 'UPDATE_NOTE', data: updateNote})
    } catch (error) {
    //   dispatch({type: 'UPDATE_NOTE_FAIL', error})
    }
  }

  export async function loadNotes(dispatch) {
    // dispatch({type: 'UPDATE_NOTE_START', note})
    try {
      const newNotes = await service.loadNotes()
      dispatch({type: 'LOAD_NOTES', data: newNotes})
    } catch (error) {
    //   dispatch({type: 'UPDATE_NOTE_FAIL', error})
    }
  }