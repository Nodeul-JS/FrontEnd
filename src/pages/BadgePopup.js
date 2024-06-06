import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cssfile/BadgePopup.css'; // CSS 파일 import

const BadgePopup = ({ githubId, onClose }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/badge/myBadgeList/${githubId}`);
        setBadges(response.data.data); // Assuming response.data.data contains the badge list
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    fetchBadges();
  }, [githubId]);

  return (
    <div className="badge-popup">
      <ul className="badge-list">
        {badges.map((badge) => (
          <li key={badge.badgeId} className="badge-item">
            <img src={`/images/badge_${badge.badgeId}.png`} alt={badge.badgeName} className="badge-image" />
            <div>
              <h3>{badge.badgeName}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BadgePopup;
