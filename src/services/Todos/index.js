import axios from "axios";

export const fetchTodos = async ({ queryKey }) => {
  const [, searchText] = queryKey;
  const { data } = await axios.get(
    `https://plan-it-backend-drab.vercel.app/api/todos?searchKey=${
      searchText || ""
    }`
  );
  return data;
};

export const addTodo = async (title, description) => {
  const response = await axios.post(
    "https://plan-it-backend-drab.vercel.app/api/todos/addTodo",
    {
      title: title,
      description: description,
    }
  );

  return response.data;
};

export const editTodo = async ({ id, updatedData }) => {
  const response = await axios.put(
    `https://plan-it-backend-drab.vercel.app/api/todos/editTodo/${id}`,
    updatedData
  );
  return response.data;
};

export const deleteTodo = async (idOrIds) => {
  if (Array.isArray(idOrIds)) {
    const response = await axios.delete(
      `https://plan-it-backend-drab.vercel.app/api/todos/deleteTodos`,
      { data: { ids: idOrIds } }
    );
    return response.data;
  }

  const response = await axios.delete(
    `https://plan-it-backend-drab.vercel.app/api/todos/deleteTodo/${idOrIds}`
  );
  return response.data;
};

export const togglePinTodo = async (id) => {
  const response = await axios.post(
    `https://plan-it-backend-drab.vercel.app/api/todos/pinTodo/${id}`
  );
  return response;
};
