import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signin from "./pages/signin/Signin";
import AddTask from "./pages/addTask/AddTask";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <AppContext.Provider value={{user, setUser,tasks,setTasks }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add-task" element={<AddTask />}></Route>
            <Route path="/edit-task" element={<AddTask />}></Route>
            {!user && (
              <>
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </>
            )}
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
