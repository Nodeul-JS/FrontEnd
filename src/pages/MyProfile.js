import React from 'react';
import TabBar from '../Components/TabBar';
import Myprofilecap from '../Components/Myprofilecap';

const MyPorfile = () => {



  return (
    <div className="container1">
      <TabBar /> {/* TabBar 컴포넌트 삽입 */}       
      <Myprofilecap />
    </div>
  );
};

export default MyPorfile;
