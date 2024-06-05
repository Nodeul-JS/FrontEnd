import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../cssfile/GptPage.css';
import TabBar from '../Components/TabBar';
import Myprofilecap from '../Components/Myprofilecap';

const GptPage = () => {
  const { githubId } = useParams();
  const [feedback, setFeedback] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://43.202.195.98:8080/api/user/mypage/${githubId}`);
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [githubId]);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`http://43.202.195.98:8080/api/commit/todayCommit/${githubId}`);
      console.log('Response data:', response.data);  // 응답 데이터를 콘솔에 출력
      const { description } = response.data; // JSON 데이터 구조에서 description 추출
      setFeedback(description);
      console.log('Feedback set:', description);  // 피드백 데이터가 제대로 설정되었는지 확인
    } catch (error) {
      console.error('Error fetching GPT feedback:', error);
    }
  };

  return (
    <div className="gpt-container">
      <TabBar />
      <div className="gpt-main">
        <div className="gpt-ch1">
          <div className='gpt-feedback-section'>
            <h1>Get GPT Feedback</h1>
            <p>내 코드를 GPT에게 자동으로 요약해 보세요</p>
            <div>
              <button type="button" className="submit-button" onClick={handleButtonClick}>Submit</button>
            </div>
            <div className="gpt-feedback-container">
              <h2>GPT auto feedback</h2>
              <textarea
                value={feedback}
                readOnly
                className="gpt-feedback-textarea"
              />
            </div>
          </div>
        </div>
        <div className='gpt-ch1'>
          <div className='gpt-2'>
              <div className='sec-1'>
                <Myprofilecap />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptPage;
