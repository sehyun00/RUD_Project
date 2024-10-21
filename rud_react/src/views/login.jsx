import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.scss';
import ios from '../assets/images/ios.png';
import google from '../assets/images/logogoogle.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 정보:', { email, password });
        // 로그인 성공 시 메인 페이지로 이동
        navigate('/home');
    };

    return (
        <div className="id_container">
            <div>
                <div className="card">
                    <h1 className="login-title">Superant</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required="required"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required="required"
                            />
                        </div>
                        <button type="submit">로그인</button>
                    </form>

                    <div className="divider">
                        <span>or</span>
                    </div>
                    <div className='google-ios'>
                        <button type="button" className='google'><img src={google} alt="google"/>Continue with Google</button>
                        <button type="button" className='apple'><img src={ios} alt="ios"/>Continue with Apple</button>
                    </div>
                </div>
                <a href="/signup" className="signup-link">Superant 계정 생성하기</a>
            </div>
        </div>
    );
};

export default Login;
