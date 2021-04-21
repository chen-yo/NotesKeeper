// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import {Route, useHistory, useRouteMatch} from 'react-router-dom'
import { DisplayNote } from "./DisplayNote";
import * as actions from '../utils/actions'
import { useAppContext } from "../appdata";

export default function DisplayNotes() {
  const { isLoading, isIdle, isSuccess, error, run, data: notes } = useAsync();
  const [state, dispatch] = useAppContext()
  let { path, url } = useRouteMatch();
  const history = useHistory()

  React.useEffect(() => {
    run(getNotes().then(data=>actions.loadNotes(dispatch, data)));
  }, [run, dispatch]);

  if (isIdle || isLoading) {
    return <span>Loading..</span>;
  }

  if (isSuccess) {
    return (
      <>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            max-width: 50%;
            margin: 0 auto;
          `}
        >
          {state.notes?.map((note) => (
            <Note {...note} onClick={() => history.push(`${url}/${note.id}`)} key={note.id}/>
          ))}
        </div>
        <Route path="/notes/:noteId" component={DisplayNote} />
      </>
    );
  }
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
function Note({ id, title, body, priority, read, color, icon, onClick }) {
  return (
    <div key={id} onClick={onClick} css={noteStyle}>
      {title}
    </div>
  );
}
