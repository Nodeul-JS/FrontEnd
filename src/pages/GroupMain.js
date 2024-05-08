import React,{ useState } from 'react';

import TabBar from '../pages/TabBar.js'; // TabBar 컴포넌트 import
import '../cssfile/Groupmain.css';


const GroupMain = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDuration, setGroupDuration] = useState('');
    const [maxMembers, setMaxMembers] = useState('');
    const [groups, setGroups] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateGroup = () => {
    const newGroup = {
        name: groupName,
        duration: groupDuration,
        maxMembers: maxMembers
      };
      setGroups([...groups, newGroup]); // 기존 그룹 리스트에 새 그룹 추가
      closeModal(); // 모달 닫기
  };
  return (
    <div className="group-page-container">
      {/* Top Bar */}
      <TabBar /> {/* TabBar 컴포넌트 삽입 */}     
      {/* Main Rectangle */}
      <div className="main-rectangle">
        {/* Group Actions */}
        <div className="group-actions">
          <button onClick={() => console.log("Leave Group")}>그룹 탈퇴</button>
          <button onClick={() => console.log("View My Groups")}>내 그룹</button>
          <button onClick={openModal}>Create Group</button>
        </div>

        {/* Group List */}
        <div className="group-list">
          <h2>My Groups</h2>
          <ul>
            {groups.map((group, index) => (
              <li key={index}>
                {group.name} - {group.duration} - Max Members: {group.maxMembers}
              </li>
            ))}
          </ul>
        </div>
      
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <h2>Create New Group</h2>
            <div className="input-container">
              <label>Group Name:</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Group Duration:</label>
              <input
                type="text"
                value={groupDuration}
                onChange={(e) => setGroupDuration(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Max Members:</label>
              <input
                type="number"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
              />
            </div>
            <button onClick={handleCreateGroup}>Create</button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default GroupMain;
