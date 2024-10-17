// feature
import React, {useState} from 'react';
import {Container, Row, Col, Table} from 'reactstrap';

// css
import '../assets/css/login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 정보:', {email, password});
    };

    return (
        <div className="id_container">
            <div className="card">
                <h1>Welcome to Superant</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <label htmlFor="email">e-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required="required"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required="required"/>
                    </div>
                    <button type="submit">Log in</button>
                </form>
                <a href="/signup" className="signup-link">sign up</a>
            </div>
        </div>
    );
};

export default LoginPage;
