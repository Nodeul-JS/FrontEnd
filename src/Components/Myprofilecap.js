import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useParams 훅 import

import '../cssfile/MyProfilecap.css'; // CSS 파일 import

const MyProfilecap = () => {
  const navigate = useNavigate();
  const { githubId } = useParams(); // URL 파라미터에서 githubId를 받아옴
  const [status, setStatus] = useState('커밋 대기 중');
  const [hasCommit, setHasCommit] = useState(false);
  const [commitData, setCommitData] = useState(null); // 커밋 데이터 상태 추가
  const [level, setLevel] = useState(1); // Default level
  const [experience, setExperience] = useState(0); // Default experience
  const [experienceRatio, setExperienceRatio] = useState(0); // 경험치 비율

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
        // Assuming max experience per level is 100 for simplicity
        setExperienceRatio((experience % 100) / 100 * 100);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCommitStatus();
    fetchUserProfile();
  }, [githubId]);

  const handleMyProfileClick = () => {
    window.open(`https://github.com/${githubId}`); // 새 창 뜨면서 이동
  };

  const handleCommitRecordClick = () => {
    navigate('/commitrecord');
  };

  const handleAICommitRecordClick = async () => {
    try {
      const response = await axios.post(`http://43.202.195.98:8080/api/commit/todayCommit/${githubId}`);
      // POST 요청을 보내고 내용 가져오기
      setCommitData(response.data); // 커밋 데이터 상태 업데이트
    } catch (error) {
      console.error('Error fetching AI commit record:', error);
    }
  };

  return (
    <div className="content-container1">
  <div className="centered-box1">
    {/* Profile Image */}
    <img src={`/images/(${level}).png`} alt=" " className="profile-image1" />

    <div className="user-details1">
      {/* GitHub ID */}
      <h1 className="nickname1">{githubId}</h1>

      {/* Experience Bar */}
      <div className="experience-bar-container1">
        <div className="experience-bar1">
          {/* Current Experience */}
          <div className="current-experience1" style={{ width: `${experienceRatio}%` }}></div>
        </div>
      </div>

      {/* GitHub Link */}
      <p className="github-link1" onClick={handleMyProfileClick}>Go to GitHub</p>

      {/* Commit Status Text */}
      <div className="commit-status1">{status}</div>

      {/* Commit Record Button */}
      {hasCommit && (
        <button className="commit-record-button" onClick={handleCommitRecordClick}>
          Commit Record
        </button>
      )}

      {/* AI Commit Record Button */}
      {status === '커밋 대기 중' && (
        <button className="ai-commit-record-button" onClick={handleAICommitRecordClick}>
          AI Commit Record
        </button>
      )}

      {/* Commit Data */}
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
