import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { message } from "antd";

import About from "./Components/About";
import Addtodo from "./Components/Addtodo";
import Todos from "./Components/Todos";
import NavIcons from "./Components/NavIcons";
import { MessageContext, TodosContext } from "./context";
import { useState } from "react";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [todosList, setTodosList] = useState(null);

  return (
    <MessageContext.Provider value={messageApi}>
      <TodosContext.Provider value={todosList}>
        {contextHolder}
        <Router>
          <NavIcons />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Addtodo />
                  <Todos setTodosList={setTodosList} />
                </>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </TodosContext.Provider>
    </MessageContext.Provider>
  );
}

export default App;
