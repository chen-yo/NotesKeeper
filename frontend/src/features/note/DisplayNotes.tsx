// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import { Button, Container, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import EditNote from './EditNote'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { deleteNote, getNotes } from './notes-actions'
import FullPageSpinner from '../../components/FullPageSpinner'
import { useLoadingForPlainAction } from '../../store/pending'
import {NoteItem} from "./NoteItem"


const MyCards = styled.div({
    width: '800px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
})

export default function DisplayNotes() {
    const dispatch = useDispatch()
    const { notes } = useSelector((state: RootState) => state.notes)
    
    const isLoading = useLoadingForPlainAction('LOAD_NOTES')

    let { path, url } = useRouteMatch()
    const history = useHistory()
    const [noteToDelete, setNoteToDelete] = useState<number | null>(null)

    React.useEffect(() => {
        dispatch(getNotes())
    }, [dispatch])

    function deleteHandler(noteId: number) {
        setNoteToDelete(noteId)
    }

    useEffect(() => {
        if (noteToDelete) {
            dispatch(deleteNote(noteToDelete))
        }
    }, [noteToDelete, dispatch])

    if (isLoading) {
        return <FullPageSpinner text="Loading your notes" />
    }
    return (
        <>
            <div className="mt-3 ml-2">
                <LinkContainer to="/notes/add">
                    <Button variant="primary">
                        <i className="fas fa-plus"></i> Add note
                    </Button>
                </LinkContainer>
            </div>
            <Container>
                <MyCards>
                    {notes?.length > 0 &&
                        notes.map((note) => (
                            <NoteItem
                                {...note}
                                onClick={() =>
                                    history.push(`${url}/${note.id}`)
                                }
                                key={note.id}
                                noteIdToDelete={noteToDelete}
                                onDelete={deleteHandler}
                            />
                        ))}
                </MyCards>
            </Container>

            {notes.length === 0 && (
                <div>
                    <span>No notes</span>
                </div>
            )}
            <Route path={`${path}/:noteId`} component={EditNote} />
        </>
    )
}


