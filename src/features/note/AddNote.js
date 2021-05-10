import React, { useEffect, useState, useRef } from "react";
import NoteForm from "./NoteForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {addNote} from './notes-actions'

export default function AddNote() {
  const {loading} = useSelector(state=>state.notes)
  const dispatch = useDispatch()
  const [addedNote, setAddedNote] = useState(null)
  const mounted = useRef(true)

  function onSubmit(note) {
    setAddedNote(note)
  }

  useEffect(() => {


    if(mounted.current) {
      mounted.current = false
      return
    }
    dispatch(addNote(addedNote))
  }, [addedNote, dispatch])

  return <NoteForm onSubmit={onSubmit} isLoading={loading} />;
}
