import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Home from "./components/home/Home.jsx";
import StateProjectExplorer from "./components/home/StateProjectExplorer.jsx";

function App() {
  return (
    <React.Fragment>
      <Router>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/projects/:state"
            element={<StateProjectExplorer />}
          />

        </Routes>

      </Router>

      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;