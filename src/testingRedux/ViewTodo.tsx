import React, { useState, useEffect } from "react";
import { Todo } from "./reducers";
import { Card, Button, Row, Col } from "react-bootstrap";
export interface ViewTodoProps {
  todo: Todo;
  handleCheck: (id: number) => void;
}

const ViewTodo: React.SFC<ViewTodoProps> = ({ todo, handleCheck }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm>
            <Card.Title>{todo.text}</Card.Title>
          </Col>
          <Col sm style={{ textAlign: "right" }}>
            <Button
              variant={todo.completed ? "success" : "danger"}
              onClick={() => {
                handleCheck(todo.id);
              }}
            >
              {todo.completed ? "Checked" : "Check now"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ViewTodo;
