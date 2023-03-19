import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './App.css';
import LandingPage from "./pages/LandingPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/details/:id" element={<DetailsPage/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;

