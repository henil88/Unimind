import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import VoicePage from "./VoicePage";

const Nav = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-5 bg-blue-500 h-[8vh]">
        <Link to="/">UniMind</Link>
        <div className="flex items-center justify-between gap-10">
          <Link to="/auth/login">Log in</Link>
          <Link to="/auth/signup">Sign up</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/voicemode" element={<VoicePage />} />
      </Routes>
    </>
  );
};

export default Nav;
