import React from "react";
import NoteForm from "./NoteForm";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks";

export default function AddForm() {
  const { run, isLoading } = useAsync();

  function addNotePromise(note) {
    return client("notes", { data: note });
  }

  function onSubmit(note) {
    console.log("Sending", note);
    run(addNotePromise(note));
  }
  return <NoteForm onSubmit={onSubmit} isLoading={isLoading} />;
}
