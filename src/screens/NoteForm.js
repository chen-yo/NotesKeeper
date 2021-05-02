import React from "react";
import {
  Form,
  Container,
  Button,
} from "react-bootstrap";
import IconDropdown from "../components/IconDropdown";
import { Formik } from "formik";

export default function NoteForm({onSubmit, note, isLoading}) {

  let noteDefault = {
    title: "",
    body: "",
    icon: "fa fa-rocket",
    color: "#CECECE",
    read: false,
    priority: 1,
  }

  if(note) {
    noteDefault = {...noteDefault, ...note}
  }
  // function addNotePromise(note) {
  //   return client("notes", { data: note });
  // }

  // function onSubmit(e) {
  //   console.log('Sending', e);
  //   run(addNotePromise(e))
  // }

  return (
    <Container className="pt-5">
      <Formik onSubmit={onSubmit} initialValues={noteDefault}>
        {({ handleChange, handleSubmit, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                rows={4}
              />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                value={values.body}
                onChange={handleChange}
                rows={5}
                placeholder="Place a description here..."
              />
            </Form.Group>
            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={values.priority}
                onChange={handleChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="read">
              <Form.Check
                type="switch"
                name="read"
                onChange={handleChange}
                label="Read"
                checked={values.read}
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="color"
                placeholder="Pick"
                name="color"
                value={values.color}
                onChange={handleChange}
                style={{ maxWidth: "50px" }}
              />
            </Form.Group>
            <Form.Group controlId="icon">
              <Form.Label>Icon</Form.Label>
              <IconDropdown
                value={values.icon}
                name="icon"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Loading" : note ? "Update" : "Add"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
