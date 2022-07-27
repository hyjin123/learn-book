import React from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios1 from "../axios";

const Login = (props) => {
  // navigating between pages using react router
  const navigate = useNavigate();
  // when user clicks login
  const onLogin = (event) => {
    //prevents default action
    event.preventDefault();
    //save the form data in variables
    const email = event.target.email.value;
    const password = event.target.password.value;
    //make an axios request to the backend to validate the login information
    axios
      .post("api/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        // save the token to the local storage of the device
        const token = res.data.accessToken;
        // save the user info into local storage (as saving it in state doesn't work on refresh)
        const userInfo = res.data.userInfo.id;
        localStorage.setItem("userinfo", userInfo);
        localStorage.setItem("jwtoken", token);
        // re-direct user to home once logged in
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="form" onSubmit={onLogin}>
      <div className="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
