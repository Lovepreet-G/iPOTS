import { useState } from 'react'
import Header from "./components/header";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <main id="main">
          {/* <Header /> */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
