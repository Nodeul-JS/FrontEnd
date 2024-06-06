import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BadgePopup = ({ githubId, onClose }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/badge/${githubId}`);
        console.log(githubId);
        setBadges(response.data); // Assuming response.data contains the badge list
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    fetchBadges();
  }, [githubId]);

  return (
    <div className="badge-popup">
      <ul>
        {badges.map((badge, index) => (
          <li key={index}>{badge}</li>
        ))}
      </ul>
    </div>
  );
};

export default BadgePopup;
