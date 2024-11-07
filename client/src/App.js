import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from './theme'; // Import your theme
import HomePage from './pages/HomePage';
import DecryptionPage from './pages/DecryptionPage';
import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider */}
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
