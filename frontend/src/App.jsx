import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navbar-components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import ChallengesPage from "./pages/ChallengesPage"
import CreateChallengePage from "./pages/CreateChallengePage";
import ChallengeDetailsPage from "./pages/ChallengeDetailsPage";


import LoginContext from "./context/LoginContext";
import UserDataContext from "./context/UserDataContext";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  return (
    <>
      <BrowserRouter>
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <UserDataContext.Provider value={{ userData, setUserData }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/challenges/create" element={<CreateChallengePage />} />
              <Route path="/challenges/:challenge_id" element={<ChallengeDetailsPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
            </Routes>
          </UserDataContext.Provider>
        </LoginContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
