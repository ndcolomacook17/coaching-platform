import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material';
import CoachProfile from './CoachProfile';
import CallReview from './CallReview';
import StudentProfile from './StudentProfile';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
        <Router>
            <Routes>
                <Route path="/profile/:id" element={<CoachProfile />} />
                <Route path="/call_review/:id" element={<CallReview />} />
                <Route path="/student_profile/:id" element={<StudentProfile />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
