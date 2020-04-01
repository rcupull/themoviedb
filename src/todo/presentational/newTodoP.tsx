import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export interface NewTodoPState {}
export interface NewTodoPDispatch {
  handleAddTodo: (text: string) => void;
}

export interface NewTodoPProps extends NewTodoPState, NewTodoPDispatch {}

const NewTodoP: React.SFC<NewTodoPProps> = ({ handleAddTodo }) => {
  const [textTodo, setTextTodo] = useState<string>("");

  const handleAddTodoIn = (text: string) => {
    setTextTodo("");
    handleAddTodo(text);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddTodoIn(textTodo);
    }
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>TODO task</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter TODO"
          value={textTodo}
          onChange={(e: any) => {
            setTextTodo(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => {
          handleAddTodoIn(textTodo);
        }}
      >
        Add TODO
      </Button>
    </Form>
  );
};

export default NewTodoP;
