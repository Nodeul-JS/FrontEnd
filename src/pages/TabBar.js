import React, { useState } from 'react';
import '../cssfile/tabbar.css'; // CSS 파일 import
import '../cssfile/modal.css'; // CSS 파일 import
import { useNavigate } from "react-router-dom";

const TabBar = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const GroupMain = () => {
      navigate("/GroupMain");
    }

  return (
    <div className="tab-bar">
      <div className="tab-group">
        <div className="tab-item">내 프로필</div>
        <div className="tab-item" onClick={GroupMain}>그룹</div>
        <div className="tab-item" onClick={openModal}>뱃지</div>
      </div>
      <div className="logout-button">
        <a className="logout-link" href="/logout">로그아웃</a>
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
