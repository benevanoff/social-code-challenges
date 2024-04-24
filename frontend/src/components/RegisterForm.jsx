import React from "react";
import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    axios.post("http://localhost:8080/users/register", {
      username: username,
      password: password,
      email: email,
    });

    setUsername("");
    setPassword("");
    setEmail("");
  };

  return (
    <div className="register-form--container">
      <form className="register-form">
        <div className="register-form--input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="register-form--input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-form--input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form>
      <button type="submit" onClick={handleSubmit}>
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
