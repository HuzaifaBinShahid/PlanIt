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
    <>
      <h3 class="my-3 text-center">Todos List</h3>
      <div
        className="container my-3 "
        style={myStyle}
      >
        <div className="row w-100 d-flex justify-content-center">
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
              <Empty
                description={
                  <span style={{ color: "white" }}>No tasks to display</span>
                }
              />
            </div>
          )}

          {!todosLoading &&
            !isError &&
            TodosList?.length > 0 &&
            TodosList.map((todo) => {
              return (
                <div className="col-md-4 mb-4" key={todo.sno}>
                  <TodoItem todo={todo} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Todos;
