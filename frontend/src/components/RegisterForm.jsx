import React, { useEffect } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  // User Input State
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();
  const registrationInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage:
        "Username should be between 4 and 20 characters and must not include special characters",
      pattern: "^[a-zA-Z0-9]{4,20}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Invalid email address",
      pattern: "[^\\s@]+@[^\\s@]+\\.[^\\s@]+",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage:
        "Password should be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage: "Passwords do not match",
      pattern: registrationData.password,
      required: true,
    },
  ];

  useEffect(() => {
    const isValid = registrationInputs.every((input) => {
      console.log(
        `==> ${input.name} is valid: ` +
          validateInput(input, registrationData[input.name]),
      );
      return validateInput(input, registrationData[input.name]);
    });

    setFormIsValid(isValid);
  }, [registrationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email } = registrationData;

    try {
      if (formIsValid) {
        const response = await axios.post(
          "http://localhost:8080/users/register",
          {
            username: username,
            password: password,
            email: email,
          },
          { headers: { "Content-Type": "application/json" } },
        );

        if (response.status === 200) {
          navigate("/home");
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = (input, currentValue) => {
    // No need for checking if input is not required field
    if (!input.required) return true;

    // Empty Field
    if (currentValue === "" || !currentValue) return false;

    // Since the pattern for confirmPassword is not a regex, do manual checking
    if (input.name === "confirmPassword") {
      return currentValue === registrationData.password;
    }

    // If there is a specified pattern check if the currentValue matches
    if (input.pattern) {
      const pattern = new RegExp(input.pattern);
      return pattern.test(currentValue);
    }
    return true;
  };

  return (
    <div className="register-form--container">
      <h1 className="register-form--heading">Register</h1>
      <form className="register-form">
        {registrationInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={registrationData[input.name]}
            pattern={input.pattern}
            onChange={onChange}
          />
        ))}
        <button
          className="register-button"
          type="submit"
          onClick={handleSubmit}
          disabled={!formIsValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
