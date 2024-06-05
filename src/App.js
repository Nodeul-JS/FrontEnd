import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login'; // Login 및 Callback 컴포넌트 가져오기
import GptPage from './pages/GptPage';
import GroupMain from './pages/GroupMain';
import MyProfile from './pages/MyProfile'; // MyProfilecap 컴포넌트 가져오기
import GroupDetail from './Components/GroupDetail';
import MemberDetail from './Components/MemberDetail'; // 멤버 상세 페이지 컴포넌트 import
import CommitCheck from './Components/CommitCheck'; 


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/GptPage/:githubId" element={<GptPage />} />
        <Route path="/GroupMain/:githubId" element={<GroupMain />} />
        <Route path="/GroupDetail/:groupId/:githubId" element={<GroupDetail />} />
        <Route path="/MyProfile/:githubId" element={<MyProfile />} /> {/* GitHub ID를 받도록 수정 */}
        <Route path="/member/:id" element={<MemberDetail />} />
        <Route path="/CommitCheck/:githubId" element={<CommitCheck />} />
      </Routes>
    </Router>
  );
};

export default App;
