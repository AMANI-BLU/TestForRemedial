import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ExamDetail.css';

const ExamDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <Container fluid className="exam-detail-container py-4">
            <div className="container-1200 mx-auto px-lg-0 px-3">
                {/* Profile Information Table */}
                <Card className="info-card border-0 mb-4">
                    <div className="info-header py-2 text-center text-white fw-bold">
                        Basic Information
                    </div>
                    <Table striped borderless className="mb-0 info-table">
                        <tbody>
                            <tr>
                                <td className="label-cell">Full Name:</td>
                                <td className="value-cell">Abebe Bikila</td>
                                <td className="label-cell">Institution:</td>
                                <td className="value-cell">Addis Ababa University</td>
                            </tr>
                            <tr>
                                <td className="label-cell">Is Blind / Is Deaf:</td>
                                <td className="value-cell">No / No</td>
                                <td className="label-cell">Institution ID:</td>
                                <td className="value-cell">R/001/16</td>
                            </tr>
                            <tr>
                                <td className="label-cell">Exam Center:</td>
                                <td className="value-cell">Addis Ababa Region</td>
                                <td className="label-cell">Enrollment Type:</td>
                                <td className="value-cell">Regular</td>
                            </tr>
                            <tr>
                                <td className="label-cell">Stream:</td>
                                <td className="value-cell">Natural Science</td>
                                <td className="label-cell">Gender:</td>
                                <td className="value-cell">Male</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>

                {/* Content */}
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="exam-detail-title cursor-pointer" onClick={toggleExpand}>
                            <span className={`chevron-icon me-2 d-inline-block transition-transform ${isExpanded ? '' : 'rotate-270'}`}>⌄</span>
                            Remedial Physics Program Examination
                        </h3>
                    </div>

                    {isExpanded && (
                        <div className="ps-4">
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
                                            Remedial Physics Program Examination
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
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
                        <h4 className="fw-bold mb-1">Exam Pin</h4>
                        <p className="text-muted small mb-3">To start this exam you need to enter the 4-character exam pin</p>

                        <Form.Group controlId="examPin">
                            <Form.Label className="small mb-1">Exam Pin</Form.Label>
                            <Form.Control
                                type="password"
                                className={`modal-custom-input ${pinError ? 'is-invalid' : ''}`}
                                value={pin}
                                onChange={(e) => {
                                    setPin(e.target.value);
                                    if (pinError) setPinError('');
                                }}
                                maxLength={4}
                                placeholder="••••"
                                autoFocus
                            />
                            {pinError && <div className="invalid-feedback small">{pinError}</div>}
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
                        <Button
                            variant="primary"
                            className="start-btn py-2 px-4"
                            onClick={() => {
                                if (pin === '1234') {
                                    navigate(`/exam-session/${id}`);
                                } else if (pin.length !== 4) {
                                    setPinError('Pin must be 4 characters');
                                } else {
                                    setPinError('Invalid exam pin');
                                }
                            }}
                        >
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
