import React, { useState } from 'react';
import '../assets/css/auth.scss'; // 변경된 경로

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordcheck: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 로직 추가
        console.log('회원가입 데이터:', formData);
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
