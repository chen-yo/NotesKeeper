// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled'
import React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import * as actions from "../utils/actions";
import { useAppContext } from "../context/app-context";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EditNote from "./EditNote";
import { useDispatch } from "react-redux";
import {getNotes} from '../store/notes-actions'
import { useSelector } from "react-redux";


export default function DisplayNotes() {
  const dispatch = useDispatch()
  const { notes, loading } =  useSelector(state=>state.notes);
  let { path, url } = useRouteMatch();
  const history = useHistory();
  

  React.useEffect(() => {
     dispatch(getNotes())
  }, [dispatch]);

  // function deleteNote(noteId) {
  //   run(
  //     client(`notes/${noteId}`, { method: "DELETE" }).then(() => {
  //       actions.deleteNote(dispatch, noteId);
  //     })
  //   );
  // }

  if (loading) {
    return <span>Loading..</span>;
  }

  return (
    <>
      <div>
        <LinkContainer to="/notes/add">
          <Button variant="outline-primary">Add note</Button>
        </LinkContainer>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          max-width: 50%;
          margin: 0 auto;
        `}
      >
        {notes?.length > 0 && notes.map((note) => (
          <Note
            {...note}
            onClick={() => history.push(`${url}/${note.id}`)}
            key={note.id}
            // onDelete={deleteNote}
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
      padding: "10px 10px 40px 10px",
      margin: "10px",
      cursor: "pointer",
      ':hover': {
        border: "1px solid blue"
      },
      backgroundColor: color
  
    }}>
      {title}
      <div>
        <button onClick={handleDelete}>X</button>
      </div>
    </div>
  );
}
