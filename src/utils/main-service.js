import { client } from "./api-client";

function updateNote(note) {
  return client("notes", { data: note, method: "PUT" });
}

function loadNotes() {
    return client("notes");
  }

function hhhh(){}

let service = {
    updateNote,
    loadNotes
}

export default service
