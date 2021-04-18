import React from "react";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import {Table} from 'react-bootstrap'

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
      <div>
        <h1>Show notes</h1>
        <Table striped bordered hover>
          <thead>
            <th>Title</th>
            <th>Body</th>
            <th>Priority</th>
            <th>Read</th>
            <th>Color</th>
            <th>Icon</th>
          </thead>
          <tbody>{notes.map((note) => <Note {...note}/> )}</tbody>
        </Table>
      </div>
    );
  }
}

function getNotes() {
  return client("notes");
}

function Note({ id, title, body, priority, read, color, icon }) {
  return <tr key={id}>
      <td>{title}</td>
      <td>{body}</td>
      <td>{priority}</td>
      <td>{read}</td>
      <td>{color}</td>
      <td>{icon}</td>
  </tr>
}
