// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";


export default function DisplayNotes() {
  const { isLoading, isIdle, isSuccess, error, run, data: notes } = useAsync();

  React.useEffect(() => {
    run(getNotes());
  }, [run]);

  if (isIdle || isLoading) {
    return <span>Loading..</span>;
  }

  if (isSuccess) {
    return (
      <div css={
        css`
        display: flex;
        flex-wrap: wrap;
        max-width: 50%;
        margin: 0 auto;
        `
      }>

          {notes.map((note) => <Note {...note}/> )}
        
      </div>
    );
  }
}

function getNotes() {
  return client("notes");
}

function Note({ id, title, body, priority, read, color, icon }) {
  return <div key={id} css={css`
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px 10px 40px 10px;
    margin: 10px;
    cursor: pointer;
    &:hover {
      border: 1px solid blue;
    }
  `}>
   {title}
  </div>
}
