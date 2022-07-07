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
  const [user, setUser] = useState("");
  console.log(user);
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
