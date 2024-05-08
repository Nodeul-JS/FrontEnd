import React from 'react';

const BadgePopup = ({ onClose }) => {
  // 뱃지 목록 데이터
  const badges = ['뱃지1', '뱃지2', '뱃지3'];

  return (
    <div className="badge-popup">
      <h2>내가 모은 뱃지</h2>
      <ul>
        {badges.map((badge, index) => (
          <li key={index}>{badge}</li>
        ))}
      </ul>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default BadgePopup;
