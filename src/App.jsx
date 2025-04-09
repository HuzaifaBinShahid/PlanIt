import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { message } from "antd";

import About from "./Components/About";
import Addtodo from "./Components/Addtodo";
import Todos from "./Components/Todos";
import MessageContext from "./context";
import NavIcons from "./Components/NavIcons";

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      <Router>
        <NavIcons />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Addtodo />
                <Todos />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </MessageContext.Provider>
  );
}

export default App;
