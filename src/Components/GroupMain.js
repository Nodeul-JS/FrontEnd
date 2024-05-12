import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../pages/TabBar';
import '../cssfile/Groupmain.css';
import '../cssfile/groupmodal.css';

const GroupMain = ({ groups, setGroups }) => {
  const getRandomGroupIcon = () => {
    const images = [
      '/images/groupicon1.png',
      '/images/groupicon2.png',
      '/images/groupicon3.png'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [groupDuration, setGroupDuration] = useState('');
  const [randomGroupIcon, setRandomGroupIcon] = useState(getRandomGroupIcon());

  //그룹 새로 고침시 그룹이 사라지는 것을 방지
  useEffect(() => {
    // 세션 스토리지에서 그룹 정보 가져오기
    const storedGroups = sessionStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행
  const openModal = () => {
    setIsModalOpen(true);
    setRandomGroupIcon(getRandomGroupIcon());
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGroupName('');
    setMaxMembers('');
    setGroupDuration('');
  };

  const handleCreateGroup = () => {
    const newGroup = {
      id: groupName.toLowerCase().replace(/\s/g, '_'),
      name: groupName,
      duration: groupDuration,
      maxMembers: maxMembers,
      icon: randomGroupIcon
    };

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    sessionStorage.setItem('groups', JSON.stringify(updatedGroups)); // 세션 스토리지에 저장
    closeModal();
  };

  const handleMaxMembersChange = (e) => {
    const value = e.target.value;
    if (parseInt(value) < 0) {
      setMaxMembers('0');
    } else {
      setMaxMembers(value);
    }
  };

  const handleGroupClick = (groupName) => {
    navigate(`/GroupMain/${groupName}`);
  };
  

  return (
    <div className="group-page-container">
      <TabBar />
      <div className="main-rectangle">
        <div className="group-actions">
          <button onClick={() => console.log('Leave Group')}>그룹 탈퇴</button>
          <button onClick={() => console.log('View My Groups')}>내 그룹</button>
          <button onClick={openModal}>그룹 생성</button>
        </div>
        <div className="group-list">
          <ul>
            {groups.map((group, index) => (
              <li key={group.id} onClick={() => handleGroupClick(group.name)}>
                <img src={group.icon} alt="Group Icon" className="group-icon" />
                <div className="group-details">
                  <p className="group-name">{group.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <div className="group-page-modal-container">
          <div className="group-page-modal-background" onClick={closeModal}></div>
          <div className="group-page-modal-content">
            <div className="group-page-modal-close" onClick={closeModal}>
              ❌
            </div>
            <div className="group-page-modal-mini">
              <img src={randomGroupIcon} alt="Group Icon" className="modal-group-icon" />
              <div className="group-page-input-container">
                <label>그룹 이름:</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className="group-page-input-container">
                <label>최대 인원:</label>
                <input
                  type="number"
                  value={maxMembers}
                  onChange={handleMaxMembersChange}
                />
              </div>
              <div className="group-page-input-container">
                <label>운영 기간:</label>
                <input
                  type="text"
                  value={groupDuration}
                  onChange={(e) => setGroupDuration(e.target.value)}
                />
              </div>
              <button onClick={handleCreateGroup}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupMain;
