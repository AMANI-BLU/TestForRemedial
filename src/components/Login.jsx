import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Static validation
        if (username === 'student' && password === 'student123') {
            navigate('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Card className="login-card border-0" style={{ maxWidth: '420px', width: '100%' }}>
                <div className="text-center mb-3">
                    <div className="logo-container mb-2">
                        <img
                            src={logo}
                            alt="EAES Logo"
                            className="img-fluid"
                            style={{ maxHeight: '140px' }}
                        />
                    </div>

                    <h2 className="title mt-2 px-1">
                        <div>National Remedial Program</div>
                        <div className="mt-1">Program Examination</div>
                    </h2>
                </div>

                <Form className="px-1" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}
                    <Form.Group className="mb-2" controlId="formUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            className="custom-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Control
                            type="password"
                            placeholder="••••••"
                            className="custom-input password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="login-btn w-auto px-4 py-2">
                        Log in
                    </Button>
                </Form>

                <hr />

                <div className="text-center footer-text">
                    <p className="text-muted small mb-0">You are using :</p>
                    <p className="domain-link fw-bold text-primary mb-0">examdemo.ethernet.edu.et</p>
                </div>
            </Card>
        </Container>
    );
};

export default Login;
