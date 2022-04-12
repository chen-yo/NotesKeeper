import { React, useEffect, useState, useRef } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import NoteForm from './NoteForm'
import { useDispatch } from 'react-redux'
import { loadNote, updateNote } from './notes-actions'
import { useLoadingForPlainAction } from '../../store/pending'

export default function EditNote() {
    let { noteId } = useParams()
    noteId = parseInt(noteId)
    const history = useHistory()
    const dispatch = useDispatch()
    const loadingNote = useLoadingForPlainAction('LOAD_NOTE')
    const loadingNoteUpdate = useLoadingForPlainAction('UPDATE_NOTE')

    const [edit, setEdit] = useState(null)
    const [saveNote, setSaveNote] = useState(null)

    function handleClose() {
        history.push('/notes')
    }

    // load edited note
    useEffect(() => {
        dispatch(loadNote(noteId)).then((n) => {
            setEdit(n)
        })
    }, [noteId, dispatch])

    // Save note upon change
    useEffect(() => {
        if (saveNote) {
            dispatch(updateNote(saveNote)).then(() => {
                history.push('/notes')
            })
        }
    }, [saveNote, dispatch, history])

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {loadingNote ? (
                        <Spinner animation="border" />
                    ) : (
                        edit && (
                            <NoteForm
                                onSubmit={(note) => setSaveNote(note)}
                                note={edit}
                                isLoading={loadingNoteUpdate}
                            />
                        )
                    )}
                </Modal.Body>
            </Modal>
            )
        </>
    )
}
