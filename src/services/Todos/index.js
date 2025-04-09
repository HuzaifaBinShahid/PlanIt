import axios from "axios";

export const fetchTodos = async ({ queryKey }) => {
  const [_key, searchText] = queryKey;
  const { data } = await axios.get(
    `http://localhost:5000/api/todos?searchKey=${searchText || ""}`
  );
  return data;
};

export const addTodo = async (title, description) => {
  const response = await axios.post("http://localhost:5000/api/todos/addTodo", {
    title: title,
    description: description,
  });

  return response.data;
};

export const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/todos/deleteTodo/${id}`);
    return response.data;
  };