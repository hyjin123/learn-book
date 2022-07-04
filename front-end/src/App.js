import { BrowserRouter, Routes, Route, Router, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./MainPage/HomePage";
import Navbar from "./Navigation/Navbar";
import Explore from "./MainPage/Explore";
import Profile from "./MainPage/Profile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
