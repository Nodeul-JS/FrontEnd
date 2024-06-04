import React, { useState } from 'react';
import '../cssfile/commitrecord.css'; // CSS 파일 import
import TabBar from '../Components/TabBar.js'; // TabBar 컴포넌트 import

const CommitRecord = () => {
  const [commitSummary, setCommitSummary] = useState('');
  const experienceRatio = 25; // 현재 경험치 비율 (예시: 25%)

  const handleCommitSummaryChange = (e) => {
    setCommitSummary(e.target.value);
  };

  const handleRecordCommit = () => {
    // 기록 남기기 버튼을 눌렀을 때 수행할 작업
    console.log('Commit Summary:', commitSummary);
    // 기타 작업 수행 가능
  };

  return (
    <div className="container">
      <TabBar /> {/* TabBar 컴포넌트 삽입 */}       
      <div className="content-container">
        <div className="centered-box">
          {/* 커밋 대기 중 텍스트 */}
          <div className="commit-status">커밋 대기 중</div>
          {/* 큰 직사각형 */}
          <div className="large-rectangle">
            <img src="/images/level1.png" alt=" " className="profile-image" />
            <div className="user-details">
              <h1 className="nickname">사용자 닉네임</h1>
              {/* 경험치 바 */}
              <div className="experience-bar-container">
                <div className="experience-bar">
                  {/* 현재 경험치 */}
                  <div className="current-experience" style={{ width: `${experienceRatio}%` }}></div>
                </div>
              </div>
              <p className="github-link"><a href="깃허브_주소">깃허브</a></p>
              <p className="blog-link"><a href="블로그_주소">블로그</a></p>
            </div>
          </div>
          {/* 오늘의 커밋 요약 입력 */}
          <div className="commitbox">
            <div className="commit-summary-container">
              <h1>오늘의 커밋 요약</h1>
              <textarea
                className="commit-summary"
                rows="2"
                cols="15"
                value={commitSummary}
                onChange={handleCommitSummaryChange}
                placeholder="커밋 내용을 입력하세요..."
              />
            </div>
          </div>
          <div className="record-button-container">
            <button onClick={handleRecordCommit} className="record-button">기록 남기기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitRecord;
