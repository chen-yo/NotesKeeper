// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import {
  Button,
  Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import EditNote from "./EditNote";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteNote, getNotes } from "./notes-actions";
import {useLoadingIndicator} from '../../utils/hooks'

const MyCards = styled.div({
  width: "800px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

const MyCard = styled.div(({ bgColor }) => ({
  margin: "10px 10px",
  padding: "10px 15px 10px",
  backgroundColor: bgColor,
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2);",
  transition: "0.3s",
  maxWidth: "200px",
  minWidth: "100px",
  height: "150px",
  
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2);",
  },
  borderRadius: "8px",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '.title': {
    textAlign: 'center',
  }
}));




export default function DisplayNotes() {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);
  const isLoading = useLoadingIndicator('LOAD_NOTES');
 


  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [noteToDelete, setNoteToDelete] = useState(null);

  React.useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  function deleteHandler(noteId) {
    setNoteToDelete(noteId);
  }

  useEffect(() => {
    if (noteToDelete) {
      dispatch(deleteNote(noteToDelete));
    }
  }, [noteToDelete, dispatch]);

  if(isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <div className="mt-3 ml-2">
        <LinkContainer to="/notes/add">
          <Button variant="primary">
            <i class="fas fa-plus"></i> Add note
          </Button>
        </LinkContainer>
      </div>
      <Container>
        <MyCards>
          {notes?.length > 0 &&
            notes.map((note) => (
              <Note
                {...note}
                onClick={() => history.push(`${url}/${note.id}`)}
                key={note.id}
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
    <MyCard bgColor={color} onClick={onClick}>
      <div className="title">{title}</div>
      <div className="tray">
        <Button variant="danger" onClick={handleDelete}><i className="fa fa-trash"></i></Button>
      </div>
    </MyCard>
  );
}
