import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import FirstPage from './pages/FirstPage';
import GroupMain from './pages/GroupMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/FirstPage" element={<FirstPage />} />
        <Route path="/GroupMain" element={<GroupMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
