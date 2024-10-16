import React, { useState } from 'react';
import '../../assets/css/css.css'; // CSS 파일을 import합니다.

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 정보:', { email, password });
    };

    return (
        <div className="container">
            <div className="card"> {/* 로그인 박스를 감싸는 div 추가 */}
                <h1>로그인</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">로그인</button>
                </form>
                <a href="/signup" className="signup-link">회원 가입</a> {/* 회원 가입 링크 추가 */}
            </div>
        </div>
    );
};

export default LoginPage;
