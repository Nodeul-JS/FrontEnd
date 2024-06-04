import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import TabBar from './TabBar';
import Myprofilecap from './Myprofilecap';
import GroupMemberList from './GroupMemberList';
import '../cssfile/GroupDetail.css';
import '../cssfile/groupadd.css';
import groupMembersData from './groupmembertest'; // 테스트 그룹원 데이터 import

const GroupDetail = () => {
  const { groupId } = useParams();

  // 테스트용 그룹원 데이터
  const groupMembersTestData = groupMembersData;

  const [showModal, setShowModal] = useState(false);
  const [inviteUsername, setInviteUsername] = useState('');
  const [usernameExists, setUsernameExists] = useState(false);
  const [groupMembers, setGroupMembers] = useState(groupMembersTestData); // 테스트 그룹원으로 초기화

  const toggleModal = () => {
    setShowModal(!showModal);
    setInviteUsername('');
    setUsernameExists(false);
  };

  const handleInvite = () => {
    // usernameExists 로직은 여기에 구현
    const newMember = { username: inviteUsername, id: Math.random().toString() };
    setGroupMembers([newMember]); // 새로운 팀원을 1행 1열로 추가

    setInviteUsername('');
    setUsernameExists(false);
    setShowModal(false);
  };

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
          <div className="group-member-detail">
            <div className="group-name-detail">{groupId}</div>
            <div className="group-detail-group-memberbox">
              <div className="group-detail-header1">
                <div className="member-count">
                  {groupMembers.length} / 6
                </div>
                <button className="add-member-button" onClick={toggleModal}>
                  팀원 추가
                </button>
              </div>
              {/* GroupMemberList로 기존 그룹원 표시 */}
              <GroupMemberList groupMembers={groupMembers} />
            </div>
          </div>
        </div>
      </div>
      {/* 초대 Modal */}
      {showModal && (
        <div className="modal-group-add">
          <div className="modal-content-group-add">
            <div className="modal-header-group-add">
              <div className="modal-title-group-add">팀원 초대</div>
              <div className="modal-close-group-add" onClick={toggleModal}>
                ❌
              </div>
            </div>
            <div className="modal-body-group-add">
              <label htmlFor="usernameInput">계정명 입력:</label>
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
                초대하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
