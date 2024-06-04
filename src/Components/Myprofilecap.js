import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useParams 훅 import

import '../cssfile/MyProfile.css'; // CSS 파일 import

const MyProfilecap = () => {
  const navigate = useNavigate();

  const { githubId } = useParams(); // URL 파라미터에서 githubId를 받아옴
  const [status, setStatus] = useState('커밋 대기 중');
  const [hasCommit, setHasCommit] = useState(false);
  const [commitData, setCommitData] = useState(null); // 커밋 데이터 상태 추가
  const experienceRatio = 25; // 현재 경험치 비율 (예시: 25%)

  useEffect(() => {
    const fetchCommitStatus = async () => {
      try {
        // localStorage.setItem('githubId', githubId);
        const response = await axios.get(`http://43.202.195.98:8080/api/commit/commitStatus/${githubId}`, { mode: 'cors' });
        if (response.data === "commitNotYet") {
          setStatus('커밋 대기 중');
          setHasCommit(true);
        } else if (response.data === "AINotYet") {
          setStatus('AI 커밋 대기 중');
          setHasCommit(false);
        } else if (response.data === "commitDone") {
          setStatus('오늘의 커밋 완료');
          setHasCommit(false);
        }
      } catch (error) {
        console.error('Error fetching commit status:', error);
        setStatus('에러발생');
        setHasCommit(false);
      }
    };

    fetchCommitStatus();
  }, []);

  const handleMyProfileClick = () => {
    const githubId = localStorage.getItem('githubId');
    window.open(`https://github.com/${githubId}`); //새 창 뜨면서 이동
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
        {/* 커밋 상태 텍스트 */}
        <div className="commit-status1">{status}</div>
        {/* 큰 직사각형 */}
        <div className="large-rectangle1">
          <img src="/images/level1.png" alt=" " className="profile-image1" />
          <div className="user-details1">
            <h1 className="nickname1">{githubId}</h1>
            {/* 경험치 바 */}
            <div className="experience-bar-container1">
              <div className="experience-bar1">
                {/* 현재 경험치 */}
                <div className="current-experience1" style={{ width: `${experienceRatio}%` }}></div>
              </div>
            </div>
            <p className="github-link1" onClick={handleMyProfileClick}>깃허브</p>
            {hasCommit && (
              <button className="commit-record-button" onClick={handleCommitRecordClick}>
                Commit Record
              </button>
            )}
            <button className="commit-record-button" onClick={handleAICommitRecordClick}>
              AI Commit Record
            </button>
            {/* 커밋 데이터 출력 */}
            {commitData && (
              <div className="commit-data-container">
                <h2>AI Commit Record</h2>
                <p>{commitData}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilecap;
