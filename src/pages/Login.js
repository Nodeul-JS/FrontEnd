import React, { useEffect } from 'react';
import '../cssfile/login.css';


const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://43.202.195.98:8080/api/login';
  };

  return (
    <div className="container2">
      <div className="tab-bar">TABBAR</div>
      <div className="content-container">
        <div className="yellow-square">
          <div className="yellow-square-text">커밋농장</div>
          <button className="login-button" onClick={handleLogin}>
            GitHub로 로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export { Login };
