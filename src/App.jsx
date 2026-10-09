import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./app-theme.css";
import Login from "./components/login/login.jsx";
import Dashboard from "./components/dashbord/dashbord.jsx";
import CoursePage from "./components/Course/Courses.jsx";
import Syllabus from "./components/Syllabus.jsx";
import ExamSchedule from "./components/ExamSchedule.jsx";
import Notes from "./components/Notes/Notes.jsx";
import VideoLibrary from "./components/VideoLibrary.jsx";
import Discussion from "./components/Discussion.jsx";
import  Settings from "./components/Settings.jsx";
import VideoRecommender from "./components/VideoRecommender.jsx";


const BackButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/dashboard") return null;

  return (
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      aria-label="Back to dashboard"
      className="route-back-button"
    >
      <ArrowLeft size={18} aria-hidden="true" />
      Back to dashboard
    </button>
  );
};


const App = () => {
  return (
    <Router>
      <BackButton />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/exam-schedule" element={<ExamSchedule />} />
        <Route path="/videolibrary" element={<VideoLibrary />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/videolibrary" element={<VideoLibrary />} />
        <Route path="/videorecommender" element={<VideoRecommender />} />
        
      </Routes>
    </Router>
  );
};

export default App;