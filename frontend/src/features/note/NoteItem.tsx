// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { ChangeEvent, MouseEvent } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useLoadingForPlainAction } from '../../store/pending'

interface NoteItemProps extends Note {
    onClick: () => void
    onDelete: (noteId: number) => void
    noteIdToDelete: number | null
}

const MyCard = styled.div<{bgColor: string}>(({ bgColor }) => ({
    margin: '10px 10px',
    padding: '10px 15px 10px',
    backgroundColor: bgColor,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2);',
    transition: '0.3s',
    maxWidth: '200px',
    minWidth: '100px',
    height: '150px',

    '&:hover': {
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2);',
    },
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '.title': {
        textAlign: 'center',
    },
}))

export const NoteItem = ({onDelete, id, noteIdToDelete, color, title, onClick}: NoteItemProps) => {
    const isLoading = useLoadingForPlainAction('DELETE_NOTE')

    function handleDelete(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        onDelete(id)
    }

    if (isLoading && noteIdToDelete === id) {
        return <MyCard bgColor={color}>
            <Spinner animation="border" />
        </MyCard>
    }
    return (
        <MyCard bgColor={color} onClick={onClick}>
            <div className="title">{title}</div>
            <div className="tray">
                <Button variant="danger" onClick={handleDelete}>
                    <i className="fa fa-trash"></i>
                </Button>
            </div>
        </MyCard>
    )
}