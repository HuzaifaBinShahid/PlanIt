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

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      <Router>
        <Header title="PlanIt" searchBar={false} />
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
        <Footer />
      </Router>
    </MessageContext.Provider>
  );
}

export default App;
