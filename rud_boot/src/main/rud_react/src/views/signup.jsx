import React, { useState } from 'react';
import '../assets/css/auth.scss'; 
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> back)logintest

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
<<<<<<< HEAD
        username: '',
        userId: '',
        email: '',
        password: '',
        passwordcheck: '',
        phone: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(null);
=======
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
>>>>>>> back)logintest

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (name === 'passwordcheck') {
            setPasswordMatch(value === formData.password);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        
        if (Object.values(formData).every(field => field.trim() !== '') && passwordMatch) {
            navigate('/login');
        } else {
            alert('모든 필드를 작성해주세요. 또는 비밀번호가 일치하지 않습니다.');
=======

        // 문자열 타입 필드 체크 (boolean 필드는 제외)
        const { name, userId, email, password, checkPassword, phoneNumber } = formData;
        if (name.trim() && userId.trim() && email.trim() && password.trim() && checkPassword.trim() && phoneNumber.trim()) {
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
            alert('모든 필드를 작성해주세요.');
>>>>>>> back)logintest
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">회원가입</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 표시 */}
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="사용자 이름"
                            className="signup-input"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="전화번호"
                            className="signup-input"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="userId"
                            placeholder="아이디"
                            className="signup-input"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일"
                            className="signup-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            className="signup-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="checkPassword"
                            placeholder="비밀번호 확인"
                            className="signup-input"
                            value={formData.checkPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
<<<<<<< HEAD
                    {passwordMatch !== null && (
                        <p className={`password-message ${passwordMatch ? 'match' : 'no-match'}`}>
                            {passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                        </p>
                    )}
=======
                    
                    <div className="input-group">
                        <label>
                            <input
                                type="checkbox"
                                name="dataAnalysisConsent"
                                checked={formData.dataAnalysisConsent}
                                onChange={handleChange}
                            />
                            데이터 분석에 동의합니다.
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            <input
                                type="checkbox"
                                name="personalInfoConsent"
                                checked={formData.personalInfoConsent}
                                onChange={handleChange}
                            />
                            개인정보 수집 및 이용에 동의합니다.
                        </label>
                    </div>
>>>>>>> back)logintest
                    <button type="submit" className="signup-button">가입하기</button>
                </form>
                <div className="signup-link-container">
                    <a href="/login" className="signup-link">이미 계정이 있나요? 로그인하기</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
