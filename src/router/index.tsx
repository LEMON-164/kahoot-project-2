import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/RegisterUsername';
import EmailRegisterPage from '../pages/Register/RegisterMail';
import Lobby from '../pages/Lobby/Lobby';
import QuizCreationPage from '../pages/CreateQuiz/CreateQuiz';
import UserDashBoard from '../pages/UserDashboard/UserDashBoard';
import TeamLobbyHostPage from '../pages/TeamLobbyHost/TeamlobbyHost';
import Host from '../pages/Host/Host';
import HostQuestionPage from '../pages/HostQuestion/HostQuestionPage';
import Leaderboard from '../pages/Leaderboard/Leaderboard';
import Summary from '../pages/Sumary/Summary';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register/username" element={<RegisterPage />} />
        <Route
          path="/register/signup-options"
          element={<EmailRegisterPage />}
        />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/creator/*" element={<QuizCreationPage />} />
        <Route path="/UserMenu" element={<UserDashBoard />} />
        <Route path="/teamlobbyhost/:gamePin" element={<TeamLobbyHostPage/>} />
        <Route path="/HostQuestionPage/:sessionId/:QuestionInGameID" element={<HostQuestionPage />} />
        <Route path="/host/:gamePin" element={<Host />} />
        <Route path="/leaderboard/:sessionId" element={<Leaderboard />} />
        <Route path="/summary/:sessionId" element={<Summary />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
