import React, { useContext, useState } from "react";
import { Button, Empty, Input, Spin } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import {
  useQuery,
} from "@tanstack/react-query";

import TodoItem from "./TodoItem";
import {  fetchTodos } from "../services/Todos";
import { MessageContext } from "../context";
import useDeleteTodo from "../hooks/useDeleteTodo";

const { Search } = Input;

const Todos = ({ setTodosList }) => {
  const message = useContext(MessageContext);
  const [searchText, setSearchText] = useState("");
  const [selectedTodoIds, setSelectedTodoIds] = useState([]);
  const { mutateAsync: deleteTodoMutateAsync } = useDeleteTodo();

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

  const handleSelectTodo = (todoId, isSelected) => {
    setSelectedTodoIds((prev) =>
      isSelected ? [...prev, todoId] : prev.filter((id) => id !== todoId)
    );
  };

  const handleBulkDelete = async () => {
    if (selectedTodoIds.length === 0) {
      message.warning("No todos selected for deletion");
      return;
    }

    message.loading(`Deleting ${selectedTodoIds.length} todos...`);

    try {
      await deleteTodoMutateAsync(selectedTodoIds);
      setSelectedTodoIds([]);
    } catch (err) {
      message.error("Some todos could not be deleted");
    }
  };

  setTodosList(TodosList);

  return (
    <>
      <h3 className="my-3 text-center">Todos List</h3>
      <div className="container my-3" style={myStyle}>
        <div className="w-25 mx-auto my-5">
          <div className="d-flex flex-column align-items-center">
            <div className="w-100 mb-3">
              <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={onSearch}
                onClear={onClearSearch}
                allowClear
              />
            </div>

            {selectedTodoIds.length > 0 && (
              <Button type="primary" danger onClick={handleBulkDelete}>
                Delete Selected ({selectedTodoIds.length})
              </Button>
            )}
          </div>
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
                <div className="col-md-4 mb-4" key={todo._id}>
                  <TodoItem
                    todo={todo}
                    selectedIds={selectedTodoIds}
                    onSelectChange={handleSelectTodo}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Todos;
