import React, { useState } from 'react';
import '../assets/css/auth.scss'; 
import { useNavigate } from 'react-router-dom'; // useNavigate import

const Signup = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [formData, setFormData] = useState({
        username: '',
        userId: '', // 아이디 추가
        email: '',
        password: '',
        passwordcheck: '',
        phone: '' // 전화번호 추가
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 회원가입 로직 추가
        console.log('회원가입 데이터:', formData);

        // 모든 필드가 작성되었는지 체크
        if (Object.values(formData).every(field => field.trim() !== '')) {
            // 로그인 페이지로 이동
            navigate('/login'); // useNavigate로 페이지 이동
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
                            placeholder="사용자 이름"
                            className="signup-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="전화번호"
                            className="signup-input"
                            value={formData.phone}
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
