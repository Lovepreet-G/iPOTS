import { useState } from "react";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import AccessMenu from "./pages/accessmenu";
import Accommodation from "./pages/accommodation";
import MedicalCondits from "./pages/medicalcondits";
import MedicalConditsReview from "./pages/medicalconditreview";
import MyAccommodationsMenu from "./pages/myAccommodationsMenu";
import MyMedicalConditions from "./pages/myMedicalCondtions";
import MyAccommodations from "./pages/myAccommodations";
import MyAccessMenu from "./pages/myaccessmenu";



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
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/myaccommodationsmenu" element={<MyAccommodationsMenu />} />
            <Route path="/myaccommodations" element={<MyAccommodations />} />
            <Route path="/medicalcondits" element={<MedicalCondits />} />
            <Route path="/myaccessmenu" element={<MyAccessMenu />} />
            <Route path="/mymedicalconditions" element={<MyMedicalConditions />} />
            <Route
              path="/medicalconditreview" element={<MedicalConditsReview />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
