import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export interface PNewTodoProps {
  handleAddTodo: (text: string) => void;
}

const PNewTodo: React.SFC<PNewTodoProps> = ({ handleAddTodo }) => {
  const [textTodo, setTextTodo] = useState<string>("");

  const handleAddTodoI = (text: string) => {
    setTextTodo("");
    handleAddTodo(text);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleAddTodoI(textTodo);
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
          handleAddTodoI(textTodo);
        }}
      >
        Add TODO
      </Button>
    </Form>
  );
};

export default PNewTodo;
