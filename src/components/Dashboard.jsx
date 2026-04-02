import React from 'react';
import { Container, Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleShow = (exam) => {
        navigate(`/exam/${exam.id}`);
    };

    const studentInfo = [
        { label1: 'Full Name:', value1: 'Student User', label2: 'Institution:', value2: 'NA' },
        { label1: 'Is Blind / Is Deaf:', value1: 'No / No', label2: 'Institution ID:', value2: 'NA' },
        { label1: 'Exam Center:', value1: 'Addis Ababa Region', label2: 'Enrollment Type:', value2: 'NA' },
        { label1: 'Stream:', value1: 'Natural Science', label2: 'Gender:', value2: 'Female' },
    ];

    const exams = [
        { id: 1, title: 'Remedial Biology', category: 'Exam overview' },
        { id: 2, title: 'Remedial Physics', category: 'Exam overview' },
        { id: 3, title: 'Remedial Chemistry', category: 'Exam overview' },
        { id: 4, title: 'Remedial Mathematics', category: 'Exam overview' },
    ];

    return (
        <Container fluid className="dashboard-container py-4">
            <div className="container-1200 mx-auto px-lg-0 px-3">
                {/* Basic Information Table */}
                <Card className="info-card border-0 mb-5">
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

                {/* My Exam Section */}
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
                                    <Card.Body className="p-3">
                                        <span className="exam-title-link text-decoration-none">
                                            {exam.title}
                                        </span>
                                        <div className="text-end mt-3">
                                            <div className="menu-dots-placeholder">⋮</div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;
