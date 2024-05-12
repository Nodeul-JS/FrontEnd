import React from 'react';
import { useParams } from 'react-router-dom';
import TabBar from './TabBar';

const GroupDetail = ({ groups }) => {
  const { groupId } = useParams();
  const group = groups.find((group) => group.id === groupId);

  // Add null check to handle undefined group
  if (!group) {
    return <div>Loading...</div>; // or display an error message
  }

  return (
    <div className="group-detail-container">
      <TabBar />
      <h2>{group.name}</h2>
      <img src={group.icon} alt="Group Icon" className="group-detail-icon" />
      <p>Duration: {group.duration}</p>
      <p>Max Members: {group.maxMembers}</p>
    </div>
  );
};

export default GroupDetail;
