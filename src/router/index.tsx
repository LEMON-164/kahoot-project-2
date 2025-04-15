import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterroomtPage from '../pages/EnterRoom/EnterRoom';
import Lobby from '../pages/Lobby/Lobby';
import React from 'react';
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/RegisterUsername";
import EmailRegisterPage from "../pages/Register/RegisterMail"; 
import QuestionPage from "../pages/QuestionPage/QuestionPage";
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<EnterroomtPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/enter-room" element={<EnterroomtPage />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/QuestionPage" element={<QuestionPage />} />
                <Route path="/register/username" element={<RegisterPage />} />
                <Route path="/register/signup-options" element={<EmailRegisterPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;