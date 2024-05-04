import React from 'react';
import axios from 'axios';
import './App.css';


const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const GITHUB_REDIRECT_URI = 'http://localhost:3000/callback'; // Redirect URI 설정 필요

function App() {
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  };

  return (
    <div className="container">
      <div className="tab-bar">
        {/* 탭바 내용 (추가적인 탭 등) */}
        TABBAR
      </div>
      <div className="content-container">
        <div className="yellow-square">
          <div className="yellow-square-text">커밋농장</div>
          <button className="login-button" onClick={handleLogin}>GitHub로 로그인하기</button>
        </div>
      </div>
    </div>
  );
}

export default App;