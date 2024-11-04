import HomePage from './pages/HomePage';
import DecryptionPage from './pages/DecryptionPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/decrypt" element={<DecryptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
