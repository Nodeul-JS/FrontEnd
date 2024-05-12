import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Commitrecord from './pages/commitrecord';
import GroupMain from './Components/GroupMain';
import MyProfile from './pages/MyProfile';
import GroupDetail from './pages/GroupDetail';

const App = () => {
  const [groups, setGroups] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/commitrecord" element={<Commitrecord />} />
        <Route
          path="/GroupMain"
          element={<GroupMain groups={groups} setGroups={setGroups} />}
        />
        <Route
          path="/GroupMain/:groupId"
          element={<GroupDetail groups={groups} />}
        />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
