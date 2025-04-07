import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import React, { useContext } from "react";

import moment from "moment";
import MessageContext from "../context";
import { deleteTodo } from "../services/Todos";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext);

  const { mutate: deleteTodoMutate, isLoading: deletingTodo } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      message.success("Todo Deleted Success");
      queryClient.invalidateQueries(["getAllTodos"]);
    },
  });

  const handleDelete = (todo) => {
    deleteTodoMutate(todo._id);
  };

  return (
    <>
      <div>
        <div className="flex">
          <h4>{todo.title}</h4>
          <p>{todo.description}</p>
        </div>
        <p>{moment(todo.time).format("DD-MM-YYYY hh:mm A")}</p>
      </div>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(todo)}
        disabled={deletingTodo}
      >
        {deletingTodo ? <Spin size="small" /> : "Delete"}
      </button>

      <hr />
    </>
  );
};

export default TodoItem;
