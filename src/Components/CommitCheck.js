import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../cssfile/CommitCheck.css';
import TabBar from './TabBar';

const CommitCheck = () => {
  const { githubId } = useParams();
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceRatio, setExperienceRatio] = useState(0);
  const [commitHistory, setCommitHistory] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState(null);

  useEffect(() => {
    // githubId를 localStorage에 저장
    localStorage.setItem('githubId', githubId);

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

    const fetchCommitHistory = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/commit/commitHistory/${githubId}`);
        setCommitHistory(response.data);
      } catch (error) {
        console.error('Error fetching commit history:', error);
      }
    };

    fetchUserProfile();
    fetchCommitHistory();
  }, [githubId]);

  const handleMyProfileClick = () => {
    window.open(`https://github.com/${githubId}`);
  };

  const handleCommitClick = (commit) => {
    setSelectedCommit(commit);
  };

  return (
    <div className="commit-container">
      <TabBar />
      <div className="commit-main">
        <div className="commit-header">
          <div className='commit-Diary'>
            <h1>Commit Diary</h1>
            <p>날짜 별 커밋 일기를 확인해 보세요</p>
          </div>
          <div className='commit-Diary-userinfo'>
            <img src={`/images/(${level}).png`} alt=" " className="commit-image1" />
            <div className="user-details">
              <p className="user-nickname1">{githubId}</p>
              <div className="current-experience1" style={{ width: `${experienceRatio}%` }}></div>
              <p className="github-link1" onClick={handleMyProfileClick}>Go to GitHub</p>
            </div>
          </div>
        </div>
        <div className='commit-body'>
          <div className='commit-body-child'>
            <div className='commit-history'>
              {commitHistory.map((commit) => (
                <div key={commit.historyId} className="commit-item">
                  <a href="#" onClick={() => handleCommitClick(commit)}>{commit.title}</a>
                  <span className="commit-date">{new Date(commit.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='commit-body-child'>
            {selectedCommit && (
              <div className='commit-gpt-reperence'>
                <h2>{selectedCommit.title}</h2>
                <a href={selectedCommit.githubLink} target="_blank" rel="noopener noreferrer">Check your code</a>
                <p>{selectedCommit.description}</p>
              </div>
            )}
            <div className="feedback-buttons">
              <button className="like-button">👍</button>
              <button className="dislike-button">👎</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitCheck;
