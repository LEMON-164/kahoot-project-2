import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterroomtPage from '../pages/EnterRoom/EnterRoom';
import Lobby from '../pages/Lobby/Lobby';
import React from 'react';
import LoginPage from "../pages/Login/Login";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<EnterroomtPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/enter-room" element={<EnterroomtPage />} />
                <Route path="/lobby" element={<Lobby />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;