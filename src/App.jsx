import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { message } from "antd";

import About from "./Components/About";
import Addtodo from "./Components/Addtodo";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Todos from "./Components/Todos";
import MessageContext from "./context";

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  let initTodo;

  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    let sno = todos.length === 0 ? 1 : todos[todos.length - 1].sno + 1;

    const myTodos = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodos]);
  };

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      <Router>
        <Header title="Todos List" searchBar={false} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Addtodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </MessageContext.Provider>
  );
}

export default App;
