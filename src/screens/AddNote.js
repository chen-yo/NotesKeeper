import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {addNote} from '../store/notes-actions'

export default function AddForm() {
  // const { run, isLoading } = useAsync();

  const {loading} = useSelector(state=>state.notes)
  const dispatch = useDispatch()
  const [addedNote, setAddedNote] = useState(null)

  function onSubmit(note) {
    setAddedNote(note)
  }

  useEffect(() => {
    dispatch(addNote(addedNote))
  }, [addedNote, dispatch])

  return <NoteForm onSubmit={onSubmit} isLoading={loading} />;
}
