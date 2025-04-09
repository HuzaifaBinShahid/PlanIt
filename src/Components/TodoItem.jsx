import React, { useState, useContext } from "react";
import moment from "moment";
import { Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import MessageContext from "../context";
import { deleteTodo, editTodo } from "../services/Todos";

import EditModal from "./Modals/EditModal";

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    todo.description
  );

  const { mutate: deleteTodoMutate, isPending: deletingTodo } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      message.success("Todo Deleted Successfully");
      queryClient.invalidateQueries(["getAllTodos"]);
    },
  });

  const { mutate: editTodoMutate, isPending: editingTodo } = useMutation({
    mutationKey: ["editTodo"],
    mutationFn: editTodo,
    onSuccess: (data) => {
      message.success("Todo Updated Successfully");
      queryClient.invalidateQueries(["getAllTodos"]);
      setIsModalVisible(false);
    },
    onError: () => {
      message.error("Error Updating Todo");
    },
  });

  const handleDelete = (todo) => {
    deleteTodoMutate(todo._id);
  };

  const handleEdit = () => {
    editTodoMutate({
      id: todo._id,
      updatedData: {
        title: updatedTitle,
        description: updatedDescription,
      },
    });
  };

  return (
    <div className="card m-3" style={{ height: "300px" }}>
      <div
        className="card-body text-dark d-flex flex-column"
        style={{ backgroundColor: "#F8F4E1", overflow: "hidden" }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title">{todo.title}</h5>
            <h6 className="card-subtitle py-2 text-muted">
              {todo.description}
            </h6>
          </div>
          <div>
            <EditOutlined
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => setIsModalVisible(true)}
            />
          </div>
        </div>

        <div className="mt-auto">
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

      <EditModal
        isModalVisible={isModalVisible}
        handleEdit={handleEdit}
        handleCancel={() => setIsModalVisible(false)}
        updatedTitle={updatedTitle}
        updatedDescription={updatedDescription}
        setUpdatedTitle={setUpdatedTitle}
        setUpdatedDescription={setUpdatedDescription}
        isEditing={editingTodo}
      />
    </div>
  );
};

export default TodoItem;
