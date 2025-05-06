import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTodo } from "../services/Todos";
import { MessageContext } from "../context";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const message = useContext(MessageContext);

  const mutation = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllTodos"]);
      message.success("Todo(s) Deleted Successfully");
    },
    onError: () => {
      message.error("Error deleting todo(s)");
    },
  });

  return mutation;
};

export default useDeleteTodo;
