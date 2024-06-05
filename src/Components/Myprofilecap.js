import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../cssfile/MyProfilecap.css';

const MyProfilecap = () => {
  const navigate = useNavigate();
  const { githubId } = useParams();
  const [status, setStatus] = useState('커밋 대기 중');
  const [hasCommit, setHasCommit] = useState(false);
  const [commitData, setCommitData] = useState(null);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceRatio, setExperienceRatio] = useState(0);

  useEffect(() => {
    const fetchCommitStatus = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/commit/commitStatus/${githubId}`, { mode: 'cors' });
        localStorage.setItem('githubId', githubId);
        if (response.data.data === "commitNotYet") {
          setStatus('커밋 대기 중');
          setHasCommit(true);
        } else if (response.data.data === "AINotYet") {
          setStatus('AI 커밋 대기 중');
          setHasCommit(false);
        } else if (response.data.data === "commitDone") {
          setStatus('오늘의 커밋 완료');
          setHasCommit(false);
        }
      } catch (error) {
        console.error('Error fetching commit status:', error);
        setStatus('에러발생');
        setHasCommit(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/user/mypage/${githubId}`);
        const { level, experience } = response.data.data;
        setLevel(level);
        setExperience(experience);
        setExperienceRatio((experience % 100) / 100 * 100);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCommitStatus();
    fetchUserProfile();
  }, [githubId]);

  const handleMyProfileClick = () => {
    window.open(`https://github.com/${githubId}`);
  };

  const handleCommitStatusClick = () => {
    if (status === '커밋 대기 중') {
      handleAICommitRecordClick();
    } else if (status === 'AI 커밋 대기 중' || status === '오늘의 커밋 완료') {
      navigate(`/gptpage/${githubId}`);
    }
  };

  const handleAICommitRecordClick = async () => {
    try {
      const response = await axios.post(`http://43.202.195.98:8080/api/commit/todayCommit/${githubId}`);
      setCommitData(response.data);
    } catch (error) {
      console.error('Error fetching AI commit record:', error);
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case '커밋 대기 중':
        return 'red';
      case 'AI 커밋 대기 중':
        return '#ffcc00';
      case '오늘의 커밋 완료':
        return 'rgb(67, 196, 67)';
      default:
        return 'transparent';
    }
  };

  return (
    <div className="content-container1">
      <div className="centered-box1">
        <img src={`/images/(${level}).png`} alt=" " className="profile-image1" />

        <div className="user-details1">
          <h1 className="nickname1">{githubId}</h1>

          <div className="experience-bar-container1">
            <div className="experience-bar1">
              <div className="current-experience1" style={{ width: `${experienceRatio}%` }}></div>
            </div>
          </div>

          <p className="github-link1" onClick={handleMyProfileClick}>Go to GitHub</p>

          <div 
            className="commit-status1" 
            style={{ backgroundColor: getStatusBackgroundColor(status), color: 'black', cursor: 'pointer' }} 
            onClick={handleCommitStatusClick}
          >
            {status}
          </div>

          {commitData && (
            <div className="commit-data-container">
              <h2>AI Commit Record</h2>
              <p>{JSON.stringify(commitData)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilecap;
