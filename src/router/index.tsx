import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/RegisterUsername";
import EmailRegisterPage from "../pages/Register/RegisterMail"; 
import Lobby from '../pages/Lobby/Lobby';
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register/username" element={<RegisterPage />} />
                <Route path="/register/signup-options" element={<EmailRegisterPage />} />
                <Route path="/lobby" element={<Lobby />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;