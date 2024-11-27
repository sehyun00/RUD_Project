import React, { useState } from 'react';
import '../assets/css/auth.scss'; 
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        userId: '',
        email: '',
        password: '',
        passwordcheck: '',
        phone: ''
    });
    const [passwordMatch, setPasswordMatch] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (name === 'passwordcheck') {
            setPasswordMatch(value === formData.password);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (Object.values(formData).every(field => field.trim() !== '') && passwordMatch) {
            navigate('/login');
        } else {
            alert('모든 필드를 작성해주세요. 또는 비밀번호가 일치하지 않습니다.');
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
                    {passwordMatch !== null && (
                        <p className={`password-message ${passwordMatch ? 'match' : 'no-match'}`}>
                            {passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
                        </p>
                    )}
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
