import React, {useState} from 'react';
import '../../assets/css/componentItems/signup.scss';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Modal} from 'reactstrap';

import closeImage from '../../assets/images/close.png';

const Signup = ({modalOpen, toggleModal}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        email: '',
        password: '',
        checkPassword: '',
        phoneNumber: '',
        personalInfoConsent: false,
        dataAnalysisConsent: false
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox'
                ? checked
                : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 문자열 타입 필드 체크 (boolean 필드는 제외)
        const {
            name,
            userId,
            email,
            password,
            checkPassword,
            phoneNumber,
            personalInfoConsent,
            dataAnalysisConsent
        } = formData;

        if (name.trim() && userId.trim() && email.trim() && password.trim() && checkPassword.trim() && phoneNumber.trim() && personalInfoConsent == true && dataAnalysisConsent == true) {
            // 비밀번호 확인 체크 추가
            if (password !== checkPassword) {
                alert('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 메시지
                return;
            }

            try {
                // 회원가입 API 호출
                const response = await axios.post('/superant/signup', formData);
                console.log('회원가입 성공:', response.data);

                // 로그인 페이지로 이동
                navigate('/login');
            } catch (error) {
                if (error.response && error.response.data) {
                    alert("아이디가 이미 존재합니다!"); // 아이디 중복 에러 메시지
                } else {
                    setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.'); // 일반 에러 메시지
                }
            }
        } else {
            alert('모든 항목에 동의해주세요.');
        }
    };

    return (
        <Modal 
        className='signup-container'
        isOpen={modalOpen}
        onRequestClose={toggleModal}
        >
            <div className='card-wrapper'>
                <div className='card-header'>
                    <img
                        className="close-image" 
                        src={closeImage} 
                        alt='닫기'  
                        onClick={toggleModal}
                        />
                </div>
                <div className="auth-card">
                    <h2 className="auth-title">회원가입</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {/* 에러 메시지 표시 */}
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="사용자 이름"
                                className="signup-input"
                                value={formData.name}
                                onChange={handleChange}
                                required="required"/>
                        </div>
                        <div className="input-group">
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="전화번호"
                                className="signup-input"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required="required"/>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="userId"
                                placeholder="아이디"
                                className="signup-input"
                                value={formData.userId}
                                onChange={handleChange}
                                required="required"/>
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일"
                                className="signup-input"
                                value={formData.email}
                                onChange={handleChange}
                                required="required"/>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                className="signup-input"
                                value={formData.password}
                                onChange={handleChange}
                                required="required"/>
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="checkPassword"
                                placeholder="비밀번호 확인"
                                className="signup-input"
                                value={formData.checkPassword}
                                onChange={handleChange}
                                required="required"/>
                        </div>

                        <div className="input-group">
                            <label>
                                데이터 분석에 동의합니다.
                                <input
                                    className='check-box'
                                    type="checkbox"
                                    name="dataAnalysisConsent"
                                    checked={formData.dataAnalysisConsent}
                                    onChange={handleChange}/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label>
                                개인정보 수집 및 이용에 동의합니다.
                                <input
                                    className='check-box'
                                    type="checkbox"
                                    name="personalInfoConsent"
                                    checked={formData.personalInfoConsent}
                                    onChange={handleChange}/>
                            </label>
                        </div>
                        <button type="submit" className="signup-button">가입하기</button>
                    </form>
                </div>
            </div>

        </Modal>
    );
};

export default Signup;
