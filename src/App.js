import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import FirstPage from './pages/FirstPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/FirstPage" element={<FirstPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
