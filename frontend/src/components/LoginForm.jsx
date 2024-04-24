import React from "react";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/users/login", {
        username: username,
        password: password,
      })
      .then((res) => console.log(res));

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-form--container">
      <form className="login-form">
        <div className="login-form--username login-form--input">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-form--password login-form--input">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <button className="login-form--submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
