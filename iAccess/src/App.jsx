import { useState } from "react";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import LegalPage from "./pages/legal";

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
            <Route path="/legal" element={<LegalPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
