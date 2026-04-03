import React, { useState } from 'react';
import { Container, Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('directions');

    const handleShow = (exam) => {
        navigate(`/exam/${exam.id}`);
    };

    const studentInfo = [
        { label1: 'Full Name:', value1: 'Abebe Bikila', label2: 'Institution:', value2: 'Addis Ababa University' },
        { label1: 'Is Blind / Is Deaf:', value1: 'No / No', label2: 'Institution ID:', value2: 'R/001/16' },
        { label1: 'Exam Center:', value1: 'Addis Ababa Region', label2: 'Enrollment Type:', value2: 'Regular' },
        { label1: 'Stream:', value1: 'Natural Science', label2: 'Gender:', value2: 'Male' },
    ];

    const exams = [
        { id: 2, title: 'Remedial Physics', category: 'Exam overview' },
    ];

    return (
        <Container fluid className="dashboard-container py-4">
            <div className="container-1200 mx-auto px-lg-0 px-3">
                {/* Custom Header with Logo */}
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <img src={logo} alt="Logo" style={{ height: '50px' }} className="me-3" />
                    <div>
                        <div className="fw-bold fs-5 text-primary">National Remedial Program</div>
                        <div className="text-muted small">Program Examination Portal</div>
                    </div>
                </div>

                {/* Basic Information Table */}
                <Card className="info-card border-0 mb-4">
                    <div className="info-header py-2 text-center text-white fw-bold">
                        Basic Information
                    </div>
                    <Table striped borderless className="mb-0 info-table">
                        <tbody>
                            {studentInfo.map((row, index) => (
                                <tr key={index}>
                                    <td className="label-cell">{row.label1}</td>
                                    <td className="value-cell">{row.value1}</td>
                                    <td className="label-cell">{row.label2}</td>
                                    <td className="value-cell">{row.value2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>

                {/* Main Tabs Navigation */}
                <div className="custom-dashboard-tabs mb-4 d-flex">
                    <div
                        className={`dashboard-tab-item px-4 py-2 cursor-pointer ${activeTab === 'directions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('directions')}
                    >
                        General Directions
                    </div>
                    <div
                        className={`dashboard-tab-item px-4 py-2 cursor-pointer ${activeTab === 'exam' ? 'active' : ''}`}
                        onClick={() => setActiveTab('exam')}
                    >
                        My Exam
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'directions' ? (
                    <Card className="border-0 shadow-sm p-4 instructions-card">
                        <h2 className="fs-4 fw-bold mb-4">Ministry of Education: National Remedial Program Portal</h2>
                        <h5 className="fw-bold mb-3">Read the following instructions before starting this Remedial Exam:</h5>
                        <ul className="instructions-list ps-3">
                            <li>Use your time effectively.</li>
                            <li>Make sure that you have answered all questions before submitting the exam.</li>
                            <li>Please abide by exam room policies.</li>
                            <li>You can only start the exam once informed by the exam coordinator to do so.</li>
                            <li>Note that your allotted time counts down on your exam page.</li>
                            <li>You cannot leave the exam center before 45 minutes.</li>
                            <li>Side talk and side watching (watching a colleague's screen) are strictly forbidden.</li>
                            <li>Moving the computer screen in any direction will result in a penalty.</li>
                            <li>Do not try to minimize the exam window before your work is submitted.</li>
                        </ul>
                        <div className="mt-4 text-center fw-bold fs-5 text-muted">Good luck!</div>
                    </Card>
                ) : (
                    <div className="exams-section">
                        <h2 className="section-title fw-bold">My Exam</h2>
                        <h5 className="section-subtitle text-muted mb-4">Exam overview</h5>

                        <hr className="mb-4" />

                        <Row className="mb-4 g-3">
                            <Col md={4}>
                                <Form.Control type="text" placeholder="Search" className="search-input" />
                            </Col>
                            <Col md={3}>
                                <Form.Select className="sort-input">
                                    <option>Sort by exam name</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row>
                            {exams.map(exam => (
                                <Col sm={6} md={4} lg={3} key={exam.id} className="mb-4">
                                    <Card className="exam-item-card border-0 shadow-sm" onClick={() => handleShow(exam)} style={{ cursor: 'pointer' }}>
                                        <div className="mosaic-thumbnail"></div>
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                            <span className="exam-title-link text-decoration-none pe-2">
                                                {exam.title}
                                            </span>
                                            <div className="menu-dots-placeholder">⋮</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Dashboard;
