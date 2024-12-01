import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import qs from 'qs';
import { CSSTransition } from 'react-transition-group'; 

import LoginInformation from './components/loginInformation';

import '../assets/css/auth.scss'; 

import superAnt from "../assets/images/super_ant.png";
import downArrow from '../assets/images/down_arrow.png';

const Login = ({loginHandler}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginInfo, setShowLoginInfo] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/superant/login', qs.stringify({
                username,
                password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.status === 200) {
                // 로그인 성공 시 메인 페이지로 이동
                loginHandler(response.data.userId);
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

    const handleImageClick = () => {
        setShowLoginInfo(prevShow => !prevShow); // 클릭 시 상태 반전
    };

    const handleClose = () => {
        setShowLoginInfo(false); // 로그인 정보를 숨김
    };

    return (
        <div className='auth-container'>
            <div className='auth-left-container'> 
                <CSSTransition
                    in={showLoginInfo}
                    timeout={300}
                    classNames="slide"
                    unmountOnExit
                >
                    <LoginInformation onClose={handleClose} />
                </CSSTransition>
                <img src={superAnt} className='superAnt'/>
                <img 
                    src={downArrow} 
                    className='down-arrow' 
                    alt="Down Arrow" 
                    onClick={handleImageClick} 
                    style={{ display: showLoginInfo ? 'none' : 'block' }} // Toggle display
                />
            </div>
            <div className='auth-right-container'>
                <div className="auth-card">
                    <h1 className="auth-title">Superant</h1>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input
                                type="username"
                                id="username"
                                placeholder="아이디를 입력하세요"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

                    <div className="signup-link-container">
                        <a href="/signup" className="signup-link">Superant 계정 생성하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;