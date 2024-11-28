import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import '../assets/css/auth.scss'; // 스타일 추가
import ios from '../assets/images/ios.png';
import google from '../assets/images/logogoogle.png';
import jwtDecode from 'jwt-decode';
import qs from 'qs';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

            //  // JWT 토큰 가져오기 (헤더에서 또는 본문에서)
            //  const jwtToken = response.headers['authorization']?.split(' ')[1]; // "Bearer <token>"에서 토큰 추출
            //  console.log('JWT Token from Header:', jwtToken);
            //  if (!jwtToken) {
            //     jwtToken = response.data.accessToken; // 본문에서 JWT 토큰 추출
            //     if (!jwtToken) {
            //         alert('JWT 토큰을 받을 수 없습니다.');
            //         return;
            //     }
            // }
            // console.log('JWT Token:', jwtToken);
            
            //  // JWT 디코딩
            //  const decodedToken = jwtDecode(jwtToken);
            //  console.log('디코딩된 JWT:', decodedToken);
 
            //  // JWT와 사용자 정보 로컬 저장소 또는 쿠키에 저장 (예: localStorage)
            //  localStorage.setItem('jwtToken', jwtToken);
            //  localStorage.setItem('userInfo', JSON.stringify(decodedToken));
 
            //  // 메인 페이지로 이동
            //  navigate('/home');
            
            if (response.status === 200) {
                console.log(username, password)
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

                    {/* <div className="divider">
                        <span>or</span>
                    </div>
                    <div className='google-ios'>
                        <button type="button" className='google'>
                            <img src={google} alt="google"/>Continue with Google
                        </button>
                        <button type="button" className='apple'>
                            <img src={ios} alt="ios"/>Continue with Apple
                        </button>
                    </div> */}
                    <div className="signup-link-container">
                        <a href="/signup" className="signup-link">Superant 계정 생성하기</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;