import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TabBar from '../Components/TabBar';
import '../cssfile/Groupmain.css';
import '../cssfile/groupmodal.css';

const GroupMain = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const [description, setDescription] = useState('');
  const [groups, setGroups] = useState([]);
  const [randomGroupIcon, setRandomGroupIcon] = useState('');

  const githubId = localStorage.getItem('githubId');

  const getRandomGroupIcon = () => {
    const images = [
      '/images/groupicon1.png',
      '/images/groupicon2.png',
      '/images/groupicon3.png'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/teams/myTeamList/${githubId}`);
        setGroups(response.data.data); // Assuming the groups data is in response.data.data
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchGroups();
    setRandomGroupIcon(getRandomGroupIcon()); // Only set once on component mount
  }, [githubId]);

  const handleGroupClick = (teamId) => { //team name으로 넘기도록 수정해야함.
    //githubId도 넘어가게 수정해야함
    navigate(`/GroupDetail/${teamId}/${githubId}`);
  };

  const handleCreateGroup = async () => {
    const newGroup = {
      teamName: groupName,
      description: description,
      githubId: githubId, // githubId는 이미 string 형태로 저장되어 있으므로 parseInt 필요 없음
      maxMember: parseInt(maxMembers, 10)
    };

    try {
      const response = await axios.post(`http://43.202.195.98:8080/api/teams`, newGroup);
      setGroups((prevGroups) => [...prevGroups, response.data.data]);
      closeModal();
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setRandomGroupIcon(getRandomGroupIcon()); // Set when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMaxMembersChange = (e) => {
    setMaxMembers(e.target.value);
  };

  return (
    <div className="group-page-container">
      <TabBar />
      <div className="main-rectangle">
        <div className="group-actions">
          <div className='group-title'>
            <h2>Group Page</h2>
            <p>함께 성장해나가는 그룹 페이지</p>
          </div>
          <div className='group-create-button'>
            <button onClick={openModal}>Group Create</button>
          </div>
        </div>
        <div className="group-list">
          <ul>
            {groups.map((group) => (
              <li key={group.id} onClick={() => handleGroupClick(group.teamId)}>
                <img src={group.icon || getRandomGroupIcon()} alt="Group Icon" className="group-icon" />
                <div className="group-details">
                  <p className="group-name">{group.teamName}</p>
                  <p className="group-decre">{group.description}</p>
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
                <label>그룹 설명:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
