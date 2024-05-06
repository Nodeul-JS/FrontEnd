import React from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";

const GITHUB_CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const GITHUB_REDIRECT_URI = 'http://localhost:3000/callback';

const  Login=()=> {
 const navigate = useNavigate();
 const FirstPage = () => {
    navigate("/FirstPage");
  }
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}`;
  };
  
  return (
    <div className="container">
      <div className="tab-bar">
        TABBAR
      </div>
      <div className="content-container">
        <div className="yellow-square">
          <div className="yellow-square-text">커밋농장</div>
          <button className="login-button" onClick={handleLogin}>
            GitHub로 로그인하기
          </button>
          <button className="login-button" onClick={FirstPage}>
            메인화면
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
