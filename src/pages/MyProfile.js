import React from 'react';
import TabBar from '../Components/TabBar';
import Myprofilecap from '../Components/Myprofilecap';
import '../cssfile/Myprofile.css';

const MyPorfile = () => {

  return (
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
            <h2>"Hello World!"</h2>
            <p>개발의 첫 시작을 알리는 유명한 문구입니다. 처음 프로그래밍을 시작할 때 누구나 이 문구를 화면에 띄우며 설렘을 느끼곤 합니다. 하지만, 복잡한 로직과 주위의 열등감 때문에 번아웃을 느끼는 경우가 많습니다. 이런 문제를 해결하고자 Commit Farm이 탄생했습니다. Commit Farm은 여러분의 커밋 히스토리를 집중적으로 관리하여, 혼자서도 꾸준히 성장할 수 있도록 도와줍니다. 이를 통해 개발자들은 자신감을 얻고, 더욱 생산적으로 일할 수 있습니다. Commit Farm은 단순한 커밋 관리 도구를 넘어서, 여러분의 개발 여정을 지원하는 동반자가 될 것입니다.</p>
            <p>개발 과정에서의 성취감을 느끼는 것은 매우 중요합니다. Commit Farm은 여러분이 작은 성과를 기록하고, 이를 통해 큰 목표를 달성할 수 있도록 돕습니다. 매일의 작은 커밋이 모여 큰 변화를 만들어냅니다. 여러분의 커밋 히스토리를 통해 성장하는 기쁨을 느껴보세요. Commit Farm은 여러분의 성장을 지켜보고, 응원하며 함께 할 것입니다. 개발자 여러분, 행복한 커밋 되세요! Commit Farm과 함께라면, 여러분의 개발 여정이 더욱 빛날 것입니다.</p>          
          </div>
        </div>
        <div className='sec1-ch'>
          <Myprofilecap />
        </div>
      </div>      
    </div>
  );
};

export default MyPorfile;
