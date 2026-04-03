import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ExamDetail from './components/ExamDetail';
import ExamSession from './components/ExamSession';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exam/:id" element={<ExamDetail />} />
          <Route path="/exam-session/:id" element={<ExamSession />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
