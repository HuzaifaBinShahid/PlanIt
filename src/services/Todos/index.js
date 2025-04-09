import axios from "axios";

export const fetchTodos = async ({ queryKey }) => {
  const [, searchText] = queryKey;
  const { data } = await axios.get(
    `https://plan-it-backend-drab.vercel.app/api/todos?searchKey=${searchText || ""}`
  );
  return data;
};

export const addTodo = async (title, description) => {
  const response = await axios.post("https://plan-it-backend-drab.vercel.app/api/todos/addTodo", {
    title: title,
    description: description,
  });

  return response.data;
};

export const deleteTodo = async (id) => {
    const response = await axios.delete(`https://plan-it-backend-drab.vercel.app/api/todos/deleteTodo/${id}`);
    return response.data;
  };