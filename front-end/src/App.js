import { BrowserRouter, Routes, Route, Router, Switch } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import HomePage from "./MainPage/HomePage";
import Navbar from "./Navigation/Navbar";
import Explore from "./MainPage/Explore";
import Profile from "./MainPage/Profile";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Resources from "./MainPage/Resources";
import Saved from "./MainPage/Saved";
import User from "./MainPage/User";

function App() {
  const [token, setToken] = useState("");
  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/home" element={<HomePage token={token} />}>
          <Route path=":topic" element={<Resources />} />
        </Route>
        <Route path="/explore" element={<Explore />} />
        <Route path="/user/:ownerId" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
