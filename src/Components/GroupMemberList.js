import React from 'react';
import '../cssfile/GroupMemberList.css';
import { Link } from 'react-router-dom';

const GroupMemberList = ({ groupMembers }) => {
  const getMemberImage = (level) => {
    return `/images/(${level}).png`;
  };

  return (
    <div>

      <div className="member-grid">
        {groupMembers.map((member) => (
          <div className="member-item" key={member.githubId}>
            <img src={getMemberImage(member.level)} alt={`Level ${member.level}`} />
            <p></p>
            <Link className='member-name' to={`/commitCheck/${member.githubId}`}>{member.githubId}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMemberList;
