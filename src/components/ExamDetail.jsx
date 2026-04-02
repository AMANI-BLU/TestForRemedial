import React, { useState } from 'react';
import { Container, Nav, Card, Button, Modal, Form, Table, Collapse } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './ExamDetail.css';

const ExamDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const studentInfo = [
        { label1: 'Full Name:', value1: 'Student User', label2: 'Institution:', value2: 'NA' },
        { label1: 'Is Blind / Is Deaf:', value1: 'No / No', label2: 'Institution ID:', value2: 'NA' },
        { label1: 'Exam Center:', value1: 'Addis Ababa Region', label2: 'Enrollment Type:', value2: 'NA' },
        { label1: 'Stream:', value1: 'Natural Science', label2: 'Gender:', value2: 'Female' },
    ];

    return (
        <Container fluid className="exam-detail-container py-4">
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

                {/* Tabs and Content */}
                <Nav variant="tabs" defaultActiveKey="exam" className="mb-4 exam-tabs">
                    <Nav.Item>
                        <Nav.Link eventKey="exam" className="px-4">Exam</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="results" className="px-4">Results</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Content */}
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="exam-detail-title cursor-pointer" onClick={toggleExpand}>
                            <span className={`chevron-icon me-2 d-inline-block transition-transform ${isExpanded ? '' : 'rotate-270'}`}>⌄</span>
                            Accounting and Finance Exit Exam 2015
                        </h3>
                        <span className="text-primary small cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? 'Collapse all' : 'Expand all'}
                        </span>
                    </div>

                    <Collapse in={isExpanded}>
                        <div>
                            <Card className="exam-link-card border-0 shadow-sm p-4 mb-4">
                                <div className="d-flex align-items-center">
                                    <div className="exam-icon-box me-3 d-flex align-items-center justify-content-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 11L11 13L15 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-muted small fw-bold mb-0">EXAM</div>
                                        <div className="exam-action-link text-primary fw-bold fs-5 cursor-pointer" onClick={handleShow}>
                                            Exit Exam 2015
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Collapse>
                </div>
            </div>

            {/* Modal remains outside the container-1200 as it's full-screen overlay */}
            <Modal show={showModal} onHide={handleClose} centered className="start-exam-modal">
                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title className="fs-5 fw-bold">Start exam</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-2">
                    <hr className="mt-0 mb-3" />

                    <div className="mb-4">
                        <h4 className="fw-bold mb-1">Password</h4>
                        <p className="text-muted small mb-3">To start this exam you need to know the exam password</p>

                        <Form.Group controlId="examPassword">
                            <Form.Label className="small mb-1">Exam password</Form.Label>
                            <Form.Control
                                type="password"
                                className="modal-custom-input"
                                autoFocus
                            />
                        </Form.Group>
                    </div>

                    <div>
                        <h4 className="fw-bold mb-1">Time limit</h4>
                        <p className="text-muted small">
                            Your attempt will have a time limit of 2 hours. When you start, the timer will begin to count down and cannot be paused. You must finish your attempt before it expires.
                        </p>
                        <p className="text-muted small fw-bold">Are you sure you wish to start now?</p>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex gap-2">
                        <Button variant="primary" className="start-btn py-2 px-4" onClick={() => navigate(`/exam-session/${id}`)}>
                            Start exam
                        </Button>
                        <Button variant="secondary" className="cancel-btn py-2 px-4 shadow-none" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ExamDetail;
