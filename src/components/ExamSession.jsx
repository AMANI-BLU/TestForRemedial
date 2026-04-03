import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ExamSession.css';

const ExamSession = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(7150); // 1:59:10 in seconds
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [flagged, setFlagged] = useState(new Set());

    const [isSummaryView, setIsSummaryView] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isTimerHidden, setIsTimerHidden] = useState(false);

    const questions = [
        {
            id: 1,
            text: "A company decided to replace an old machine with a new machine. Which of the following is considered a relevant cost?",
            options: [
                'The book value of the old equipment',
                'The loss on the disposal of the old equipment',
                'Depreciation expense on the old equipment',
                'The current disposal price of the old equipment'
            ]
        },
        { id: 2, text: "Which accounting principle requires financial statements to be prepared under the assumption that the entity will continue to operate for the foreseeable future?", options: ['Entity concept', 'Going concern', 'Matching principle', 'Cost principle'] },
        { id: 3, text: "The primary purpose of a statement of cash flows is to provide information about:", options: ['Cash receipts and cash payments', 'An entity\'s assets and liabilities', 'Changes in equity', 'Net income for the period'] },
        { id: 4, text: "Which of the following is an example of an intangible asset?", options: ['Inventory', 'Goodwill', 'Prepaid insurance', 'Accounts receivable'] },
        { id: 5, text: "A trial balance is useful for:", options: ['Determining the market value of a company', 'Detecting all errors in accounting records', 'Verifying that total debits equal total credits', 'Calculating net profit'] }
    ];

    const studentInfo = [
        { label1: 'Full Name:', value1: 'Student User', label2: 'Institution:', value2: 'NA' },
        { label1: 'Is Blind / Is Deaf:', value1: 'No / No', label2: 'Institution ID:', value2: 'NA' },
        { label1: 'Exam Center:', value1: 'Addis Ababa Region', label2: 'Enrollment Type:', value2: 'NA' },
        { label1: 'Stream:', value1: 'Natural Science', label2: 'Gender:', value2: 'Female' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const formatQuestion = (text) => {
        if (!text) return "";
        return text.split('\n').map((line, i) => (
            <React.Fragment key={i}>
                {line}
                {i !== text.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const handleOptionChange = (idx) => {
        setAnswers({ ...answers, [currentQuestion]: idx });
    };

    const toggleFlag = (idx = currentQuestion) => {
        const newFlagged = new Set(flagged);
        if (newFlagged.has(idx)) newFlagged.delete(idx);
        else newFlagged.add(idx);
        setFlagged(newFlagged);
    };

    const clearChoice = () => {
        const newAnswers = { ...answers };
        delete newAnswers[currentQuestion];
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsSummaryView(true);
        }
    };

    const goToQuestion = (index) => {
        setCurrentQuestion(index);
        setIsSummaryView(false);
    };

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isSummaryView) {
        return (
            <Container fluid className="exam-session-container py-3">
                <div className="container-1200 mx-auto">
                    <h2 className="fw-bold mb-4">Summary of attempt</h2>
                    <Table bordered hover className="summary-table mb-4">
                        <thead className="bg-light">
                            <tr>
                                <th>Question</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((_, index) => (
                                <tr key={index}>
                                    <td>
                                        <span
                                            className="summary-question-link cursor-pointer text-primary"
                                            onClick={() => goToQuestion(index)}
                                        >
                                            {index + 1}
                                        </span>
                                        {flagged.has(index) && <span className="ms-2">🚩</span>}
                                    </td>
                                    <td>
                                        {answers[index] !== undefined ? 'Answer saved' : 'Not yet answered'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="text-center mb-5">
                        <Button variant="secondary" className="return-attempt-btn px-4 py-2" onClick={() => setIsSummaryView(false)}>
                            Return to attempt
                        </Button>
                    </div>

                    <div className="d-flex flex-column align-items-center mt-5">
                        <div className="timer-box border-danger text-danger px-3 py-1 mb-3 align-self-end">
                            Time left {formatTime(timeLeft)}
                        </div>

                        {questions.length - Object.keys(answers).length > 0 && (
                            <div className="alert alert-warning w-100 text-center mb-3">
                                <span className="fw-bold">Warning:</span> You have {questions.length - Object.keys(answers).length} unanswered question(s).
                            </div>
                        )}

                        <div className="small text-muted mb-3">
                            This attempt must be submitted by Thursday, 22 June 2023, 7:39 AM.
                        </div>
                        <Button variant="primary" className="submit-finish-btn px-5 py-2" onClick={() => setShowConfirmModal(true)}>
                            Submit all and finish
                        </Button>
                    </div>

                    {/* Confirmation Modal */}
                    <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered className="confirm-modal">
                        <Modal.Header closeButton className="border-0 pb-0">
                            <Modal.Title className="h5 fw-bold">Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="py-3">
                            Once you submit, you will no longer be able to change your answers for this attempt.
                        </Modal.Body>
                        <Modal.Footer className="border-0 justify-content-start pt-0 pb-4">
                            <div className="d-flex gap-2 w-100">
                                <Button variant="primary" className="confirm-submit-btn flex-grow-1" onClick={() => navigate('/dashboard')}>
                                    Submit all and finish
                                </Button>
                                <Button variant="secondary" className="cancel-btn flex-grow-1" onClick={() => setShowConfirmModal(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="exam-session-container py-3">
            <div className="container-1200 mx-auto">
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

                <Row className="g-3">
                    {/* Left Sidebar: Question Info */}
                    <Col lg={2}>
                        <Card className="question-info-card border-0 bg-light p-3">
                            <div className="fw-bold">Question <span className="fs-4">{currentQuestion + 1}</span></div>
                            <div className="small text-muted mb-2">
                                {answers[currentQuestion] !== undefined ? 'Answered' : 'Not yet answered'}
                            </div>
                            <div className="small text-muted mb-3">Marked out of 1.00</div>
                            <div className="small text-primary cursor-pointer" onClick={() => toggleFlag()}>
                                <span className="flag-icon me-1">{flagged.has(currentQuestion) ? '🚩' : '⚐'}</span>
                                {flagged.has(currentQuestion) ? 'Remove flag' : 'Flag question'}
                            </div>
                        </Card>
                    </Col>

                    {/* Main Content: Question and Timer */}
                    <Col lg={8} className="mb-4">
                        <div className="d-flex justify-content-end align-items-center mb-2 gap-2" style={{ minHeight: '34px' }}>
                            {!isTimerHidden && (
                                <div className="timer-box px-3 py-1 fw-bold">
                                    {`Time left ${formatTime(timeLeft)}`}
                                </div>
                            )}
                            <Button
                                variant="secondary"
                                className="hide-btn py-1 px-3"
                                onClick={() => setIsTimerHidden(!isTimerHidden)}
                            >
                                {isTimerHidden ? 'Show' : 'Hide'}
                            </Button>
                        </div>

                        <Card className="question-card border-0 shadow-sm p-4 mb-4">
                            <div className="question-text mb-4">
                                {formatQuestion(questions[currentQuestion].text)}
                            </div>

                            <Form>
                                {questions[currentQuestion].options.map((option, idx) => (
                                    <Form.Check
                                        key={idx}
                                        type="radio"
                                        id={`q${currentQuestion}-opt${idx}`}
                                        label={`${String.fromCharCode(65 + idx)}. ${option}`}
                                        name="exam-options"
                                        className="mb-3 custom-option"
                                        checked={answers[currentQuestion] === idx}
                                        onChange={() => handleOptionChange(idx)}
                                    />
                                ))}
                            </Form>
                            {answers[currentQuestion] !== undefined && (
                                <div className="clear-choice-link text-primary small cursor-pointer" onClick={clearChoice}>
                                    Clear my choice
                                </div>
                            )}
                        </Card>

                        <div className="d-flex justify-content-between align-items-center mb-5">
                            {currentQuestion > 0 ? (
                                <Button
                                    variant="secondary"
                                    className="prev-page-btn px-4 py-2"
                                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                >
                                    Previous page
                                </Button>
                            ) : (
                                <div></div>
                            )}
                            <Button
                                variant="primary"
                                className="next-btn px-4 py-2"
                                onClick={nextQuestion}
                            >
                                {isLastQuestion ? 'Finish attempt ...' : 'Next question'}
                            </Button>
                        </div>
                    </Col>

                    {/* Right Sidebar: Exam Navigation */}
                    <Col lg={2}>
                        <Card className="navigation-card border-0 shadow-sm p-3">
                            <div className="fw-bold mb-3">Exam Navigation</div>
                            <div className="d-flex flex-wrap gap-1 mb-3">
                                {questions.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`nav-box ${index === currentQuestion ? 'current' : ''} ${answers[index] !== undefined ? 'answered' : ''} ${flagged.has(index) ? 'flagged' : ''}`}
                                        onClick={() => goToQuestion(index)}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className="text-primary small cursor-pointer" onClick={() => setIsSummaryView(true)}>Finish exam...</div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default ExamSession;
