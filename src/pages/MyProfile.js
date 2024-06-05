import React from 'react';
import TabBar from '../Components/TabBar';
import Myprofilecap from '../Components/Myprofilecap';
import '../cssfile/Myprofile.css';

const MyPorfile = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      
      <div className="container1">
        <TabBar /> {/* TabBar 컴포넌트 삽입 */}
        <div className="sec1">
          <div className="sec1-ch">
            <div className="paragraph1">
              <p>About Commit Farm</p>
            </div>
            <div className='paragraph2'>
              <p>행복한 개발자 되기의 첫걸음을 Commit Farm과 함께 시작해 보세요!</p>
            </div>
            <div className='paragraph3'>
              <h2>print("Hello World!")</h2>
            </div>
          </div>
          <div className='sec1-ch'>
            <Myprofilecap style={{ width: '300px', height: '300px' }} />
          </div>
        </div>      
      </div>
    </>
  );
};

export default MyPorfile;
