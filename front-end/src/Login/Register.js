import React from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  // navigating between pages using react router
  const navigate = useNavigate();
  // when user registers an account with all their information
  const onRegister = (event) => {
    //prevents default action
    event.preventDefault();
    //save the form data in variables
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    //make an axios request to the backend to save this value to the db
    axios
      .post("/register", {
        first_name,
        last_name,
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
      .catch((err) => console.log("this is an error man "));
  };

  return (
    <form className="form" onSubmit={onRegister}>
      <div className="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          placeholder="First Name"
        />
      </div>
      <div className="form-group">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          placeholder="Last Name"
        />
      </div>
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
        Register
      </button>
    </form>
  );
};

export default Register;
