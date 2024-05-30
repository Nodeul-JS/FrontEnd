import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Commitrecord from './pages/commitrecord';
import GroupMain from './Components/GroupMain';
import MyProfile from './pages/MyProfile';
import GroupDetail from './Components/GroupDetail';
import MemberDetail from './Components/MemberDetail'; // 멤버 상세 페이지 컴포넌트 import


const App = () => {
  const [groups, setGroups] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/commitrecord" element={<Commitrecord />} />
        <Route path="/GroupMain" element={<GroupMain groups={groups} setGroups={setGroups} />}/>
        <Route path="/GroupMain/:groupId" element={<GroupDetail groups={groups} />}/>
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
