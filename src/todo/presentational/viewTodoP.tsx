import * as React from "react";
import { Todo } from "../utils/todoStateControl";
import { Card, Button, Row, Col } from "react-bootstrap";

export interface ViewTodoPProps {
  todo: Todo;
  handleChangeActive: (id: number) => void;
}

const ViewTodoP: React.SFC<ViewTodoPProps> = ({ todo, handleChangeActive }) => {
  const buttonVariant = todo.active ? "danger" : "success";
  const buttonText = todo.active ? "Active" : "Success";

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={8}>
            <Card.Title>{todo.text}</Card.Title>
          </Col>
          <Col sm={4}>
            <Button
              onClick={() => {
                if (todo.active) handleChangeActive(todo.id);
              }}
              variant={buttonVariant}
            >
              {buttonText}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ViewTodoP;
