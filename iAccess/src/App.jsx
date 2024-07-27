import { useState } from "react";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import AccessMenu from "./pages/accessmenu";
import MedicalCondits from "./pages/medicalcondits";
import ProfilePage from "./pages/accountinfo";
import ProfileEdit from "./pages/editprofile";
import ChangePassword from "./pages/changepassword";

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
            <Route path="/medicalcondits" element={<MedicalCondits />} />
            <Route path="/accountinfo" element={<ProfilePage />} />
            <Route path="/editprofile" element={<ProfileEdit />} />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
