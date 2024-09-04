import { useState } from "react";
import Header from "./components/header";
import HomePage from "./pages/homepage";
import AccessMenu from "./pages/accessmenu";
import Accommodation from "./pages/accommodation";
import MedicalCondits from "./pages/medicalcondits";
import ProfilePage from "./pages/accountinfo";
import ProfileEdit from "./pages/editprofile";
import ChangePassword from "./pages/changepassword";
import MedicalConditsReview from "./pages/medicalconditreview";
import MyAccommodationsMenu from "./pages/myAccommodationsMenu";
import MyMedicalConditions from "./pages/myMedicalCondtions";
import MyAccommodations from "./pages/myAccommodations";
import MyAccessMenu from "./pages/myaccessmenu";
import Dictionary from "./pages/dictionary";
import DictionaryReview from "./pages/dictionaryreview";
import MyAllergies from "./pages/myallergies";



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
            <Route path="/myallergies" element={<MyAllergies />} />
            <Route path="/medicalcondits" element={<MedicalCondits />} />
            <Route path="/accountinfo" element={<ProfilePage />} />
            <Route path="/editprofile" element={<ProfileEdit />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/myaccessmenu" element={<MyAccessMenu />} />
            <Route path="/mymedicalconditions" element={<MyMedicalConditions />} />
            <Route
              path="/medicalconditreview"
              element={<MedicalConditsReview />}
            />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionaryreview" element={<DictionaryReview />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
