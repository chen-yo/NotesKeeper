// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled'
import React, { useEffect, useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EditNote from "./EditNote";
import { useDispatch } from "react-redux";
import {getNotes} from '../store/notes-actions'
import { useSelector } from "react-redux";
import { deleteNote } from "../store/notes-actions";


export default function DisplayNotes() {
  const dispatch = useDispatch()
  const { notes, loading } =  useSelector(state=>state.notes);
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [noteToDelete, setNoteToDelete] = useState(null)
  

  React.useEffect(() => {
     dispatch(getNotes())
  }, [dispatch]);

  function deleteHandler(noteId) {
    setNoteToDelete(noteId)
  }

  useEffect(()=> {
    if(noteToDelete) {
      dispatch(deleteNote(noteToDelete))
    }
  }, [noteToDelete, dispatch])

  return (
    <>
      <div className="mt-3 ml-2">
        <LinkContainer to="/notes/add">
          <Button variant="primary"><i class="fas fa-plus"></i> Add note</Button>
        </LinkContainer>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          max-width: 50%;
          margin: 20px auto;
        `}
      >
        {notes?.length > 0 && notes.map((note) => (
          <Note
            {...note}
            onClick={() => history.push(`${url}/${note.id}`)}
            key={note.id}
            onDelete={deleteHandler}
          />
        ))}
      </div>
      {
        notes.length === 0 && <div><span>No notes</span></div>
      }
      <Route path={`${path}/:noteId`} component={EditNote} />
    </>
  );
}

function Note({
  id,
  title,
  body,
  priority,
  read,
  color,
  icon,
  onClick,
  onDelete,
}) {
  function handleDelete(event) {
    event.stopPropagation();
    onDelete(id);
  }
  return (
    <div key={id} onClick={onClick} css={{
      border: "1px solid gray",
      borderRadius: "10px",
      padding: "10px 10px 10px 10px",
      width: "200px",
      height: "200px",
      margin: "10px",
      cursor: "pointer",
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      ':hover': {
        border: "1px solid blue"
      },
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: color,
      '& a': {
        color: 'blue'
      },
      '& .trash': {
        alignSelf: 'flex-start',
        fontSize: '25px',
      }
    }}>
      <div ><span>{title}</span></div>
      <div className="trash">
      <button type="button" className="btn btn-danger" onClick={handleDelete}><i class="far fa-trash-alt"></i></button>
      </div>
    </div>
  );
}
