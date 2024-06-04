import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login'; // Login 및 Callback 컴포넌트 가져오기

import Commitrecord from './pages/commitrecord';
import GroupMain from './pages/GroupMain';
import MyProfile from './pages/MyProfile'; // MyProfilecap 컴포넌트 가져오기
import GroupDetail from './Components/GroupDetail';
import MemberDetail from './Components/MemberDetail'; // 멤버 상세 페이지 컴포넌트 import

const App = () => {
  const [groups, setGroups] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/commitrecord" element={<Commitrecord />} />
        <Route path="/GroupMain" element={<GroupMain groups={groups} setGroups={setGroups} />} />
        <Route path="/GroupMain/:groupId" element={<GroupDetail groups={groups} />} />
        <Route path="/MyProfile/:githubId" element={<MyProfile />} /> {/* GitHub ID를 받도록 수정 */}
        <Route path="/member/:id" element={<MemberDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
