import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ChallengesPage from "./pages/ChallengesPage"
import CreateChallengePage from "./pages/CreateChallengePage";

import Navbar from "./components/navbar-components/Navbar";

import LoginContext from "./context/LoginContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <BrowserRouter>
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/challenges/create" element={<CreateChallengePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </LoginContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
