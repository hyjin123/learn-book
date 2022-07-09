import { BrowserRouter, Routes, Route, Router, Switch } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import HomePage from "./MainPage/HomePage";
import Navbar from "./Navigation/Navbar";
import Explore from "./MainPage/Explore";
import Profile from "./MainPage/Profile";
import Login from "./Login/Login";
import Register from "./Login/Register";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<HomePage token={token} user={user} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/register"
          element={<Register user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
