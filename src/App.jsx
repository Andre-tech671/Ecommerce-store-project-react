import React from 'react';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router';
import './App.css'

function App() {
  

  return (
   <Routes>
    <Route index element={<HomePage />} />
      <Route path="checkout" element={<h1>Checkout Page</h1>} />
   </Routes>
  )
}

export default App
