import { React, useEffect, useState, useRef } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import NoteForm from './NoteForm'
import { useDispatch } from 'react-redux'
import { useLoadingIndicator } from '../../utils/hooks'
import { getNotes, updateNote } from './notes-actions'

export default function EditNote() {
    let { noteId } = useParams()
    noteId = parseInt(noteId)
    const history = useHistory()
    const dispatch = useDispatch()
    const isLoading = useLoadingIndicator('LOAD_NOTE')

    const [edit, setEdit] = useState(null)

    function handleClose() {
        history.push('/notes')
    }

    // load edited note
    useEffect(() => {
        getNotes(noteId, dispatch).then((n) => {
            setEdit(n)
        })
    }, [noteId, dispatch])

    function handleEdit(modifiedNote) {
        dispatch(updateNote(modifiedNote))
        history.push('/notes')
    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <Spinner animation="border" />
                    ) : (
                        edit && <NoteForm onSubmit={handleEdit} note={edit} />
                    )}
                </Modal.Body>
            </Modal>
            )
        </>
    )
}
