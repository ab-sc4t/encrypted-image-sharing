import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import HomePage from './pages/HomePage';
import DecryptionPage from './pages/DecryptionPage';
import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/decrypt" element={<DecryptionPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
