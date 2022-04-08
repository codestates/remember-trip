import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/mocules/navbar';
import LogInPage from './components/pages/logIn';

export default function App() {
  return (
    <Router>
      <Navbar />
      <LogInPage></LogInPage>
    </Router>
  );
}
