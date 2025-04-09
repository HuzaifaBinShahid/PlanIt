import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import React, { useContext } from "react";

import moment from "moment";
import MessageContext from "../context";
import { deleteTodo } from "../services/Todos";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext);

  const { mutate: deleteTodoMutate, isPending: deletingTodo } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      message.success("Todo Deleted Successfully");
      queryClient.invalidateQueries(["getAllTodos"]);
    },
  });

  const handleDelete = (todo) => {
    deleteTodoMutate(todo._id);
  };

  return (
    <div className="card m-3" style={{ height: "300px" }}>
      <div
        className="card-body text-dark d-flex flex-column"
        style={{
          backgroundColor: "#F8F4E1",
          overflow: "hidden",
        }}
      >
        <div
        className="scrollable-content"
          style={{
            overflowY: "auto",
            flex: "1 1 auto",
            marginBottom: "1rem",
          }}
        >
          
          <h5 className="card-title">{todo.title}</h5>
          <h6 className="card-subtitle py-2 text-muted">{todo.description}</h6>
        </div>

        <div>
          <p className="card-text text-sm">
            {moment(todo.time).format("dddd (DD-MM-YYYY) hh:mm A")}
          </p>
          <button
            className="btn btn-sm btn-danger w-100"
            onClick={() => handleDelete(todo)}
            disabled={deletingTodo}
          >
            {deletingTodo ? <Spin size="small" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
