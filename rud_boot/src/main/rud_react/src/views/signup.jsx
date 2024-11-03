import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
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
        passwordcheck: '',
        phone: '',
        dataAnalysisConsent: false, // 데이터 분석 동의 체크박스
        personalInfoConsent: false    // 개인정보 동의 체크박스
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

        const allFieldsValid = Object.values(formData).every(field => {
            // 불리언 필드는 true/false로 체크하고, 문자열 필드는 trim 후 체크
            return typeof field === 'boolean' || (typeof field === 'string' && field.trim() !== '');
        });

        if (allFieldsValid) {
            try {
                const response = await axios.post('/superant/signup', {
                    userId: formData.userId,
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    checkPassword: formData.passwordcheck,
                    phoneNumber: formData.phone,
                    dataAnalysisConsent: formData.dataAnalysisConsent,
                    personalInfoConsent: formData.personalInfoConsent
                });

                if (response.status === 200) {
                    navigate('/login');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.message || '회원가입 중 오류가 발생했습니다.');
                } else {
                    alert('서버와의 연결에 문제가 발생했습니다.');
                }
            }
        } else {
            alert('모든 필드를 작성해주세요.'); // 필드가 모두 작성되지 않았을 때 알림
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
                            placeholder="이름 씨발아"
                            className="signup-input"
                            value={formData.username}
                            onChange={handleChange}
                            required="required"/>
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="전화번호 씨발아"
                            className="signup-input"
                            value={formData.phone}
                            onChange={handleChange}
                            required="required"/>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="userId"
                            placeholder="아이디 씨발아"
                            className="signup-input"
                            value={formData.userId}
                            onChange={handleChange}
                            required="required"/>
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일 씨발아"
                            className="signup-input"
                            value={formData.email}
                            onChange={handleChange}
                            required="required"/>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호 씨발아"
                            className="signup-input"
                            value={formData.password}
                            onChange={handleChange}
                            required="required"/>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="passwordcheck"
                            placeholder="비밀번호 확인 씨발아"
                            className="signup-input"
                            value={formData.passwordcheck}
                            onChange={handleChange}
                            required="required"/>
                    </div>

                    {/* 체크박스 추가 */}
                    <div className="input-group">
                        <label>
                            <input
                                type="checkbox"
                                name="dataAnalysisConsent"
                                checked={formData.dataAnalysisConsent}
                                onChange={handleChange} />
                            데이터 분석에 동의합니다.
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            <input
                                type="checkbox"
                                name="personalInfoConsent"
                                checked={formData.personalInfoConsent}
                                onChange={handleChange} />
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
