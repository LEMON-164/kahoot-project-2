import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Progress } from 'antd';
import {
    CaretUpOutlined,
    CaretRightOutlined,
    CaretDownOutlined,
    CaretLeftOutlined,
} from '@ant-design/icons';
import './QuestionPage.css';

const { Title } = Typography;

const QuestionPage = () => {
    const [timeLeft, setTimeLeft] = useState(10); // Countdown timer
    const [answersCount, setAnswersCount] = useState(0); // Fake data

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const answers = [
        { text: 'banana', color: '#e74c3c', icon: <CaretUpOutlined /> },
        { text: 'apple', color: '#3498db', icon: <CaretRightOutlined /> },
        { text: 'watermelon', color: '#f1c40f', icon: <CaretDownOutlined /> },
        { text: 'cherry', color: '#27ae60', icon: <CaretLeftOutlined /> },
    ];

    return (
        <div className="question-container">
            {/* Timer & Answers */}
            <div className="question-header">
                <div className="timer-circle">
                    <span>{timeLeft}</span>
                </div>
                <div className="question-header-bar">
                    <Title level={2} className="question-text">
                        What does "香蕉" mean?
                    </Title>
                </div>


                <div className="answer-count">
                    <Title level={4}>{answersCount}</Title>
                    <span>Answers</span>
                </div>
            </div>

            {/* Optional Image */}
            {/* <div className="question-image">
                <h1 style={{ color: '#00bfa6' }}>Kahoot!</h1>
            </div> */}

            {/* Answer Choices */}
            <Row gutter={[16, 16]} className="answer-options">
                {answers.map((ans, idx) => (
                    <Col xs={24} sm={12} key={idx}>
                        <Button
                            className="answer-button"
                            style={{ backgroundColor: ans.color }}
                            block
                            icon={ans.icon}
                            size="large"
                        >
                            {ans.text}
                        </Button>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default QuestionPage;
