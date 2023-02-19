import React, { useState, useEffect } from "react";

import Header from "./Components/Header";
import Addtodo from "./Components/Addtodo";
import Todos from "./Components/Todos";
import About from "./Components/About";
import Footer from "./Components/Footer";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  let initTodo;

  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    let sno;

    if (todos.length === 0) {
      sno = 1;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

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
    <>
      <Router>
        <Header title="Todos List" searchBar={false} />

        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <>
                  <Addtodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} />
                </>
              );
            }}
          ></Route>

          <Route exact path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
