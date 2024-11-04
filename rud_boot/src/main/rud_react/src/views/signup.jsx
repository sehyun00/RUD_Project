import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// scss
import '../assets/css/auth.scss';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        userId: '',
        email: '',
        password: '',
        checkPassword: '',
        phoneNumber: '',
        dataAnalysisConsent: false,
        personalInfoConsent: false
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 모든 필드가 유효한지 체크
        const allFieldsValid = Object.values(formData).every(field => {
            return typeof field === 'boolean' || (typeof field === 'string' && field.trim() !== '');
        });

        // 비밀번호 확인 체크 추가
        if (formData.password !== formData.checkPassword) {
            alert('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 메시지
            return;
        }

        if (allFieldsValid) {
            try {
                const response = await axios.post('/superant/signup', {
                    userId: formData.userId,
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                    dataAnalysisConsent: formData.dataAnalysisConsent,
                    personalInfoConsent: formData.personalInfoConsent
                });

                if (response.status === 200) {
                    navigate('/login');
                    console.log("가입 성공");
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
                } else {
                    alert('서버와의 연결에 문제가 발생했습니다.');
                }
            }
        } else {
            alert('모든 필드를 작성해주세요.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">회원가입</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="이름을 입력하세요"
                            className="signup-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="전화번호를 입력하세요"
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
                            placeholder="아이디를 입력하세요"
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
                            placeholder="이메일을 입력하세요"
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
                            placeholder="비밀번호를 입력하세요"
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

                    <button type="submit" className="signup-button">가입하기</button>
                </form>
                <a href="/login" className="signup-link">이미 계정이 있나요? 로그인하기</a>
            </div>
        </div>
    );
};

export default Signup;
