
// export { Login };
import React from 'react';
import '../cssfile/login.css';
import { FaGithub } from 'react-icons/fa'; // Assuming you're using react-icons for the GitHub icon

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://43.202.195.98:8080/api/login';
  };
  return (
    <div className="login-container">
      <h1 className="hello-world">“Hello World !”</h1>
      <p className="welcome-text">Welcome to Commit farm</p>
      <div className="github-login">
        <FaGithub className="github-icon" />
        <span className="continue-with">continue with</span>
        <button className="github-button" onClick={handleLogin} >
          GitHub
        </button>
      </div>
      <p className="terms-text">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
      </p>
    </div>
  );
};

export { Login };
