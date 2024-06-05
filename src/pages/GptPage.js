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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 GPT에게 코드를 보내고 피드백을 받는 로직을 추가합니다.
  };

  return (
    <div className="gpt-container">
      <TabBar />
      <div className="gpt-main">
        <div className="gpt-ch1">
          <div className='gpt-feedback-section'>
            <h1>Get GPT Feedback</h1>
            <p>내 코드를 GPT에게 자동으로 요약해 보세요</p>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="submit-button">Submit</button>
            </form>
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
                <Myprofilecap  />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptPage;
