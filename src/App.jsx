import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Matricule from './screens/Matricule';
import Admin from './screens/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Matricule />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
