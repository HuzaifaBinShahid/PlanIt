import { useQuery } from "@tanstack/react-query";
import { Empty, Spin } from "antd";
import React, { useContext } from "react";

import MessageContext from "../context";
import { fetchTodos } from "../services/Todos";
import TodoItem from "./TodoItem";

const Todos = () => {
  const message = useContext(MessageContext);
  const {
    data: TodosList,
    isLoading: todosLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllTodos"],
    queryFn: fetchTodos,
    onSuccess: (data) => {
      console.log("✅ Fetched Todos Successfully:", data);
    },
    onError: (error) => {
      message.error("Error Fetching Todos");
    },
  });

  let myStyle = {
    minHeight: "70vh",
  };

  return (
    <div className="container my-3" style={myStyle}>
      <h3 className=" my-3">Todos List</h3>

      {todosLoading && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      )}

      {isError && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Empty description="Failed to load tasks" />
        </div>
      )}

      {!todosLoading && !isError && TodosList?.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Empty description="No tasks to display" />
        </div>
      )}

      {!todosLoading &&
        !isError &&
        TodosList?.length > 0 &&
        TodosList.map((todo) => {
          return <TodoItem todo={todo} key={todo.sno} />;
        })}
    </div>
  );
};

export default Todos;
