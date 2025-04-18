import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import LoginPage from "../pages/Login/Login";
import RegisterPage from "../pages/Register/RegisterUsername";
import EmailRegisterPage from "../pages/Register/RegisterMail"; 
import Lobby from '../pages/Lobby/Lobby';
import QuizCreationPage from "../pages/CreateQuiz/CreateQuiz";
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register/username" element={<RegisterPage />} />
                <Route path="/register/signup-options" element={<EmailRegisterPage />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/creator" element={<QuizCreationPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;