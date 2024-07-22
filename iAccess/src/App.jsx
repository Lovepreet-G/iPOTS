import { useState } from "react";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import AccessMenu from "./pages/accessmenu";

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
            <Route path="/accessmenu" element={<AccessMenu />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
