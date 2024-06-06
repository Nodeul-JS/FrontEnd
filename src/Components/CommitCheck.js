import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaGithub } from 'react-icons/fa';
import '../cssfile/CommitCheck.css';
import TabBar from './TabBar';

const CommitCheck = () => {
  const { githubId } = useParams();
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceRatio, setExperienceRatio] = useState(0);
  const [commitHistory, setCommitHistory] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/user/mypage/${githubId}`);
        const { level, experience } = response.data.data;
        setLevel(level);
        setExperience(experience);
        setExperienceRatio((experience / 10) * 100); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchCommitHistory = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/commit/commitHistory/${githubId}`);
        const sortedHistory = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCommitHistory(sortedHistory);
      } catch (error) {
        console.error('Error fetching commit history:', error);
      }
    };

    fetchUserProfile();
    fetchCommitHistory();
  }, [githubId]);

  // const handleMyProfileClick = () => {
  //   window.open(`https://github.com/${githubId}`);
  // };

  const handleCommitClick = (commit) => {
    setSelectedCommit(commit);
    setHasLiked(false);
    setHasDisliked(false);
  };

  const handleLike = async () => {
    if (selectedCommit && !hasLiked && !hasDisliked) {
      try {
        await axios.post(`http://43.202.195.98:8080/api/commit/good/${selectedCommit.historyId}`);
        setSelectedCommit((prev) => ({ ...prev, good: prev.good + 1 }));
        setHasLiked(true);
      } catch (error) {
        console.error('Error liking commit:', error);
      }
    }
  };

  const handleDislike = async () => {
    if (selectedCommit && !hasLiked && !hasDisliked) {
      try {
        await axios.post(`http://43.202.195.98:8080/api/commit/bad/${selectedCommit.historyId}`);
        setSelectedCommit((prev) => ({ ...prev, bad: prev.bad + 1 }));
        setHasDisliked(true);
      } catch (error) {
        console.error('Error disliking commit:', error);
      }
    }
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
              <div className="experience-bar-container1">
                <div className="experience-bar1">
                  <div className="current-experience1" style={{ width: `${experienceRatio}%` }}></div>
                </div>
              </div>
              <a className="github-link1" href={`https://github.com/${githubId}`} target="_blank" rel="noopener noreferrer">
                <FaGithub className="github-icon" /> https://github.com/{githubId}
              </a>
            </div>
          </div>
        </div>
        <div className='commit-body'>
          <div className='commit-body-child'>
            <div className='commit-history'>
              {commitHistory.map((commit, index) => (
                <div key={commit.historyId} className="commit-item">
                  <span className="commit-number">{index + 1}.</span>
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
              <div className="like-container">
                <span>{selectedCommit ? selectedCommit.good : 0}</span>
                <button className="like-button" onClick={handleLike}>👍</button>
              </div>
              <div className="dislike-container">
                <button className="dislike-button" onClick={handleDislike}>👎</button>
                <span>{selectedCommit ? selectedCommit.bad : 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitCheck;
