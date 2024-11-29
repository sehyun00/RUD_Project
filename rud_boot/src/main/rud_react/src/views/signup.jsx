import React, { useState } from 'react';
import '../assets/css/auth.scss'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        email: '',
        password: '',
        passwordcheck: '',
        phoneNumber: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 모든 필드가 작성되었는지 체크
        if (Object.values(formData).every(field => field.trim() !== '')) {
            try {
                // 회원가입 API 호출
                const response = await axios.post('/superant/signup', formData);
                console.log('회원가입 성공:', response.data);
                
                // 로그인 페이지로 이동
                navigate('/login');
            } catch (error) {
                console.error('회원가입 실패:', error);
                setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.'); // 에러 메시지 설정
            }
        } else {
            alert('모든 필드를 작성해주세요.');
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
                            name="passwordcheck"
                            placeholder="비밀번호 확인"
                            className="signup-input"
                            value={formData.passwordcheck}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">가입하기</button>
                </form>
                <a href="/login" className="signup-link">이미 계정이 있나요? 로그인하기</a>
            </div>
        </div>
    );
};

export default Signup;
