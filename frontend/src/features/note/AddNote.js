import React, { useEffect, useState, useRef } from 'react'
import NoteForm from './NoteForm'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addNote } from './notes-actions'
import { useLoadingForPlainAction } from '../../store/pending'

export default function AddNote() {
    const isLoading = useLoadingForPlainAction('ADD_NOTE')
    const dispatch = useDispatch()
    const [addedNote, setAddedNote] = useState(null)
    const mounted = useRef(true)

    function onSubmit(note) {
        setAddedNote(note)
    }

    useEffect(() => {
        if (mounted.current) {
            mounted.current = false
            return
        }
        dispatch(addNote(addedNote))
    }, [addedNote, dispatch])

    return <NoteForm onSubmit={onSubmit} isLoading={isLoading} />
}
