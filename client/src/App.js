import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Diary from './components/Diary';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Store from './store';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Store>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/diary" element={<Diary />} />
          </Routes>
        </Router>
      </Store>
    </div>
  );
}
