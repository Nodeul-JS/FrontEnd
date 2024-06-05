import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TabBar from './TabBar';
import Myprofilecap from './Myprofilecap';
import GroupMemberList from './GroupMemberList';
import '../cssfile/GroupDetail.css';
import '../cssfile/groupadd.css';

const GroupDetail = () => {
  const { groupId, githubId } = useParams(); // Extract githubId from params
  const [showModal, setShowModal] = useState(false);
  const [inviteUsername, setInviteUsername] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [maxMembers, setMaxMembers] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    // Save githubId to localStorage
    if (githubId) {
      localStorage.setItem('githubId', githubId);
    }

    const fetchGroupDetails = async () => {
      try {
        // Fetch group members
        const memberResponse = await axios.get(`http://43.202.195.98:8080/api/teams/memberList/${groupId}`);
        setGroupMembers(memberResponse.data.data);

        // Fetch groups user is part of
        const groupsResponse = await axios.get(`http://43.202.195.98:8080/api/teams/myTeamList/${githubId}`);
        const groups = groupsResponse.data.data;

        // Find the group that matches the current groupId
        const currentGroup = groups.find(group => group.teamId.toString() === groupId);
        if (currentGroup) {
          setTeamName(currentGroup.teamName);
          setMaxMembers(currentGroup.maxMembers);
        }
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupId, githubId]); // Include githubId in the dependency array

  const toggleModal = () => {
    setShowModal(!showModal);
    setInviteUsername('');
    setUsernameExists(false);
  };

  const handleInvite = async () => {
    try {
      const response = await axios.post('http://43.202.195.98:8080/api/teams/invitation', {
        teamId: groupId,
        githubId: inviteUsername
      });

      // 만약 백엔드에서 존재하는 사용자를 추가할 수 있다는 신호를 보낸다면, 추가
      if (response.data.canAdd) {
        const newMember = { username: inviteUsername, id: Math.random().toString() };
        setGroupMembers([...groupMembers, newMember]);
        setInviteUsername('');
        setUsernameExists(false);
        setShowModal(false);
      } else {
        setUsernameExists(true);
      }
    } catch (error) {
      console.error('Error inviting member:', error);
    }
  };

  const handleModalOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
      setInviteUsername('');
      setUsernameExists(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleModalOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleModalOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleModalOutsideClick);
    };
  }, [showModal]);

  return (
    <div className="group-detail-container">
      <div className="group-detil-profile">
        <TabBar />
      </div>
      <div className="group-detail-cat">
        <div className="group-my-profile">
          <Myprofilecap />
        </div>
        <div className="group-member">
          <div className='group-tapbar'>
            <div className='group-info'>
              <div className="group-Page">GroupPage</div>
              <div className='group-info-title'>{teamName}</div>
            </div>
            <div className='group-member-number'>
                {groupMembers.length} / {maxMembers}
            </div>
            <div className='group-invite'>
              <button className="add-member-button" onClick={toggleModal}>
              Invite
                  </button>
            </div>
          </div>
          <div className="group-member-detail">
            <div className="group-detail-group-memberbox">
              <GroupMemberList groupMembers={groupMembers} />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-group-add">
          <div className="modal-overlay"></div>
          <div className="modal-content-group-add" ref={modalRef}>
            <div className="modal-header-group-add">
              <div className="modal-title-group-add">invite Member</div>
              <div className="modal-close-group-add" onClick={toggleModal}>
                ❌
              </div>
            </div>
            <div className="modal-body-group-add">
              <label htmlFor="usernameInput">GitHubID:</label>
              <input
                type="text"
                id="usernameInput"
                value={inviteUsername}
                onChange={(e) => setInviteUsername(e.target.value)}
              />
              {inviteUsername && (
                <div className="username-validation">
                  {usernameExists ? (
                    <p className="exists">이미 존재하는 계정명입니다.</p>
                  ) : (
                    <p className="not-exists">존재하지 않는 계정명입니다.</p>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer-group-add">
              <button className="modal-button" onClick={handleInvite}>
              Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
