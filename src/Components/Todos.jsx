import { AudioOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input, Space, Spin } from "antd";
import React, { useContext, useState } from "react";

import MessageContext from "../context";
import { fetchTodos } from "../services/Todos";
import TodoItem from "./TodoItem";
const { Search } = Input;

const Todos = () => {
  const message = useContext(MessageContext);
  const [searchText, setSearchText] = useState("");
  const {
    data: TodosList,
    isPending: todosLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getAllTodos", searchText],
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

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );
  const onSearch = (value) => {
    setSearchText(value.trim());
  };

  const onClearSearch = () => {
    setSearchText("");
    refetch();
  };

  return (
    <>
      <h3 class="my-3 text-center">Todos List</h3>
      <div className="container my-3 " style={myStyle}>
        <div className="w-25 mx-auto my-5">
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={onSearch}
              onClear={onClearSearch}
              allowClear
            />
          </Space>
        </div>
        <div className="row w-100 d-flex justify-content-center">
          {todosLoading && (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
            </div>
          )}

          {isError && (
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Empty
                description={
                  <span className="text-white">Failed to load tasks</span>
                }
              />
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
