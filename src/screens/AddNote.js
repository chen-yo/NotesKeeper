import React from "react";
import { Form, Container } from "react-bootstrap";

export default function AddNote() {
  return (
    <Container className="pt-5">
      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Do this..." />
        </Form.Group>
        <Form.Group controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Place a description here..."
          />
        </Form.Group>
        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="read">
          <Form.Check type="checkbox" label="Read" />
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="color"
            placeholder="Pick"
            style={{ maxWidth: "50px" }}
          />
        </Form.Group>
        <Form.Group controlId="icon">
          <Form.Label>Icon</Form.Label>
          <Form.Control as="select">
            <option>Power</option>
            <option>Rush</option>
            <option>Cool</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Container>
  );
}
