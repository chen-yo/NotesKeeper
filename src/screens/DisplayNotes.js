// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import * as actions from "../utils/actions";
import { useAppContext } from "../appdata";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function DisplayNotes() {
  const { isLoading, isIdle, isSuccess, isError, error, run } = useAsync();
  const [state, dispatch] = useAppContext();
  const { notes } = state;
  let { path, url } = useRouteMatch();
  const history = useHistory();

  console.log("DisplayNotes is loading");

  React.useEffect(() => {
    run(getNotes().then((data) => actions.loadNotes(dispatch, data)));
  }, [run, dispatch]);

  function deleteNote(noteId) {
    run(
      client(`notes/${noteId}`, { method: "DELETE" }).then(() => {
        actions.deleteNote(dispatch, noteId);
      })
    );
  }

  if (isIdle) {
    return <span>Loading..</span>;
  }

  if (isError) {
    return <span>An error occured</span>;
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
            onDelete={deleteNote}
          />
        ))}
      </div>
      {
        notes.length === 0 && <div><span>No notes</span></div>
      }
     
    </>
  );
}

function getNotes() {
  return client("notes");
}

const noteStyle = css`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px 10px 40px 10px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid blue;
  }
`;
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
    <div key={id} onClick={onClick} css={noteStyle}>
      {title}
      <div>
        <button onClick={handleDelete}>X</button>
      </div>
    </div>
  );
}
