import React from 'react';
import '../cssfile/MyProfile.css'; // CSS 파일 import
import TabBar from '../pages/TabBar';

const MyPorfile = () => {

  const experienceRatio = 25; // 현재 경험치 비율 (예시: 25%)


  return (
    <div className="container1">
      <TabBar /> {/* TabBar 컴포넌트 삽입 */}       
      <div className="content-container1">
        <div className="centered-box1">
          {/* 커밋 대기 중 텍스트 */}
          <div className="commit-status1">커밋 대기 중</div>
          {/* 큰 직사각형 */}
          <div className="large-rectangle1">
            <img src="/images/level1.png" alt=" " className="profile-image1" />
            <div className="user-details1">
              <h1 className="nickname1">f류지원</h1>
              {/* 경험치 바 */}
              <div className="experience-bar-container1">
                <div className="experience-bar1">
                  {/* 현재 경험치 */}
                  <div className="current-experience1" style={{ width: `${experienceRatio}%` }}></div>
                </div>
              </div>
              <p className="github-link1"><a href="깃허브_주소">깃허브</a></p>
              <p className="blog-link1"><a href="블로그_주소">블로그</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPorfile;
