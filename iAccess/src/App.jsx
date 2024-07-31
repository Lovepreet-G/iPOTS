import { useState } from "react";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import AccessMenu from "./pages/accessmenu";
import Accommodation from "./pages/accommodation";
import MedicalCondits from "./pages/medicalcondits";
import MedicalConditsReview from "./pages/medicalconditreview";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <main id="main">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accessmenu" element={<AccessMenu />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/medicalcondits" element={<MedicalCondits />} />
            <Route
              path="/medicalconditreview/:letter"
              element={<MedicalConditsReview />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
