// MemberDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import TabBar from '../pages/TabBar';
import Myprofilecap from '../pages/Myprofilecap'; // Myprofilecap 컴포넌트 import

const MemberDetail = () => {
  const { id } = useParams(); // 멤버 ID 파라미터 가져오기

  // 예시: 사용자의 프로필 정보 (실제 데이터는 전역 상태 또는 컨텍스트에서 가져옴)
  const userProfile = {
    id: id,
    username: 'User123',
    email: 'user123@example.com',
    imageUrl: '/path/to/profile/image.jpg',
    // 기타 프로필 정보
  };

  // 멤버 ID에 기반하여 데이터를 가져와 렌더링
  return (
    <div>
      <TabBar /> {/* TabBar 컴포넌트 추가 */}
      <div>
        <Myprofilecap userProfile={userProfile} /> {/* Myprofilecap 컴포넌트에 프로필 정보 전달 */}
      </div>
    </div>
  );
};

export default MemberDetail;
