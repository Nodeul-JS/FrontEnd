import React from 'react';
import '../cssfile/GroupMemberList.css';
import { Link } from 'react-router-dom';

const GroupMemberList = ({ groupMembers }) => {
  return (
    <div>
      <h2>그룹 멤버:</h2>
      <div className="member-grid">
        {groupMembers.map((member) => (
          <div className="member-item" key={member.id}>
            <img src={member.imageUrl} alt={member.username} />
            <p>ID: {member.id}</p>
            <Link to={`/member/${member.id}`}>{member.username}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMemberList;
