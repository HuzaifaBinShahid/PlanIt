import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { deleteTodo, editTodo, togglePinTodo } from "../services/Todos";

import EditModal from "./Modals/EditModal";
import TodoCardBody from "./common/cardBody";
import { MessageContext } from "../context";

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

  const { mutate: togglePinMutate , isPending: isTodoBeingPinned  } = useMutation({
    mutationKey: ["pinTodo"],
    mutationFn: togglePinTodo,
    onSuccess: () => {
      message.success("Pin status updated");
      queryClient.invalidateQueries(["getAllTodos"]);
    },
    onError: () => {
      message.error("Failed to update pin status");
    },
  });

  const togglePin = (todo) => {
    togglePinMutate(todo._id);
  };

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
      <TodoCardBody
        todo={todo}
        onTogglePin={() => togglePin(todo)}
        onEditClick={() => setIsModalVisible(true)}
        onDelete={() => handleDelete(todo)}
        deleting={deletingTodo}
        isTodoBeingPinned = {isTodoBeingPinned}
      />

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
