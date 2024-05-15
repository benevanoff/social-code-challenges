import React from "react";
import axios from "axios";

import FormInput from "./FormInput";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStatus from "../hooks/useUserStatus";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { setIsLoggedIn } = useUserStatus()
  const navigate = useNavigate();

  const loginInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage: "Incorrect Username",
      pattern: "^[a-zA-Z0-9]{4,20}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage: "Incorrect Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        },
      );

      if (response.status === 200) {
        setIsLoggedIn(true)
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoginData({
      username: "",
      password: "",
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-form--container">
      <h1 className="login-form--heading">Login</h1>
      <form className="login-form">
        {loginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={loginData[input.name]}
            onChange={onChange}
          />
        ))}
        <button
          type="submit"
          className="login-form--submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
