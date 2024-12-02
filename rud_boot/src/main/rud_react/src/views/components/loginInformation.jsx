import React from "react"

import '../../assets/css/components/loginInformation.scss';

import downArrow from '../../assets/images/down_arrow.png';
import shannon from '../../assets/images/shannon_stock.png';

const LoginInformation = ({onClose, currentTheme}) => {
    return (
        <div className="login-information-container" style={{ backgroundColor: currentTheme.colors.Bg, color: currentTheme.colors.MainFont }}>
            <img src={downArrow} className='down-arrow' alt="Down Arrow" onClick={onClose}/>
            <div className="information-container">
                <h1>리벨런싱이란?</h1>
                <div>
                    <img src={shannon} className="shannon"/>
                    <p>리벨런싱은 투자 포트폴리오의 자산 배분을 원래의 목표 비율로 되돌리는 과정입니다.</p>
                    <p>이는 자산의 가치가 변동함에 따라 시간이 지나면서 설정한 비율이 무너지는 것을 방지하기 위한 방법입니다.
                    </p>
                    <p>리벨런싱은 투자자들이 위험을 관리하고, 장기적인 투자 목표를 달성하는 데 도움을 줍니다.</p>
                </div>

                <h1>리벨런싱의 장점</h1>

                <div>

                    <h3>위험 관리:</h3>
                    <div>
                        <p>포트폴리오의 자산 배분을 유지함으로써 특정 자산에 대한 과도한 노출을 방지하고, 전반적인 투자 위험을 줄일 수 있습니다.</p>
                    </div>

                    <h3>감정적 결정 방지:</h3>
                    <div>
                        <p>시장의 변동성에 따라 감정적으로 투자 결정을 내리는 것을 방지하고, 체계적이고 논리적인 투자 접근 방식을 유지할 수 있습니다.</p>
                    </div>

                    <h3>수익 극대화:</h3>
                    <div>
                        <p>자산의 가격이 상승했을 때 일부를 매도하고, 가격이 하락했을 때 매수하는 방식으로, 평균 매입 단가를 낮추고 수익을 극대화할 수 있습니다.</p>
                    </div>

                    <h3>투자 목표 유지:</h3>
                    <div>
                        <p>장기적인 투자 목표에 맞춰 포트폴리오를 조정함으로써, 목표 달성을 위한 경로를 유지할 수 있습니다.</p>
                    </div>

                    <h3>세금 효율성:</h3>
                    <div>
                        <p>특정 자산의 손실을 실현하여 세금 혜택을 받을 수 있는 기회를 제공하기도 합니다. 이를 통해 전반적인 세금 부담을 줄일 수 있습니다.</p>
                    </div>

                </div>
                <h1/>
                <p>리벨런싱은 투자 전략의 중요한 요소로, 장기적인 안정성과 수익성을 추구하는 데 필수적인 방법입니다.</p>
            </div>
        </div>
    );
};

export default LoginInformation;