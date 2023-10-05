import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route component={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
