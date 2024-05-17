import React from "react";
import RegisterForm from '../components/FormComponents/RegisterForm'

const LandingPage = () => {
  return (
    <div className="landing-page full-screen-height">
      <div className="landing-page--headings">
        <h1>
          Learn through <span>coding challenges</span> with other developers!
        </h1>
      </div>
      <RegisterForm />
    </div>
  );
};

export default LandingPage;
