import React, { useState } from 'react';
import '../cssfile/tabbar.css'; // CSS 파일 import
import '../cssfile/modal.css'; // CSS 파일 import
import { useNavigate } from "react-router-dom";

const TabBar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleMyProfileClick = () => {
      const githubId = localStorage.getItem('githubId');
      navigate(`/MyProfile/Yukyung98?token=${githubId}`);
    };
    const handleLogoutClick = () => {
      localStorage.removeItem('githubId');
      navigate('/');
    };
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const GroupMain = () => {
      const githubId = localStorage.getItem('githubId'); // Assuming userId is stored in localStorage
      if (githubId) {
          navigate(`/GroupMain/${githubId}`);
      } else {
          console.error('User ID not found in localStorage');
      }
  };
    

  return (
    <div className="tab-bar">
      <div className="tab-group">
        <div className = "tab-sec-1">
          <div className="web-name">Commit Farm</div>
        </div>
        <div className='tab-sec-2'>
          <div className="tab-item" onClick={GroupMain}>Group</div>
          <div className="tab-item" onClick={openModal}>Badge</div>
          <div className="tab-item" onClick={handleMyProfileClick}>MyPage</div>
          <div className="logout-button">
            <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
          </div>
        </div>
      </div>
      

     {/* 모달 */}
     {isModalOpen && (
        <div className="modal-container">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
          <div className="modal-header">
              <h2 className="modal-title">뱃지 목록</h2>
              <div className="modal-close" onClick={closeModal}>❌</div>
            </div>
            {/* 뱃지 내용 */}
            <div className="badge-list">
              {/* 뱃지 목록을 여기에 표시 */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBar;
