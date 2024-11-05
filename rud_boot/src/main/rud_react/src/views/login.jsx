import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import '../assets/css/auth.scss'; // 스타일 추가
import ios from '../assets/images/ios.png';
import google from '../assets/images/logogoogle.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/superant/login', { // 백엔드 로그인 API 경로
                email,
                password
            });
            
            if (response.status === 200) {
                console.log('로그인 성공:', response.data);
                // 로그인 성공 시 메인 페이지로 이동
                navigate('/home'); 
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || '로그인 중 오류가 발생했습니다.');
            } else {
                alert('서버와의 연결에 문제가 발생했습니다.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div>
                <div className="auth-card">
                    <h1 className="auth-title">Superant</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required="required"
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                placeholder="비밀번호를 입력하세요"
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
                        <button type="button" className='google'>
                            <img src={google} alt="google"/>Continue with Google
                        </button>
                        <button type="button" className='apple'>
                            <img src={ios} alt="ios"/>Continue with Apple
                        </button>
                    </div>
                    <div className="signup-link-container">
                        <a href="/signup" className="signup-link">Superant 계정 생성하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
