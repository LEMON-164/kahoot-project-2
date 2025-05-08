// src/pages/Summary.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Row, Col, Button, Spin } from 'antd';
import { getSessionSummary } from '../../services/QuizServices';
import './Summary.css';

const Summary = () => {
    const { sessionId } = useParams();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getSessionSummary(sessionId);
                setSummary(data.data);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [sessionId]);

    if (loading || !summary) {
        return <Spin fullscreen tip="Đang tải dữ liệu..." />;
    }


    return (
        <div className="summary-container">
            <Button onClick={() => navigate(-1)}>⬅ Quay lại</Button>
            <h2>{summary.quizTitle}</h2>

            <Row gutter={16} className="summary-info">
                <Col span={6}>
                    <div className="summary-card highlight">
                        <h1>{summary?.averageScore}</h1>
                        <p>Điểm trung bình</p>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="summary-card">
                        <p>👥 Người chơi</p>
                        <b>{summary?.totalPlayers ?? 0}</b>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="summary-card">
                        <p>⏱ Bắt đầu lúc</p>
                        <b>{summary?.startedAt ? new Date(summary.startedAt).toLocaleString() : 'Không rõ'}</b>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="summary-card">
                        <p>🏆 Đội thắng</p>
                        <b>{summary?.highestScoringTeam ?? 'Chưa xác định'}</b>
                    </div>
                </Col>
            </Row>

            <h3 className="summary-section">🧑‍🤝‍🧑 Người chơi</h3>
            <Table
                dataSource={summary?.players ?? []}
                rowKey="playerId"
                columns={[
                    { title: 'Tên', dataIndex: 'nickname' },
                    { title: 'Đội', dataIndex: 'teamId' },
                    { title: 'Điểm', dataIndex: 'totalScore' },
                ]}
                pagination={false}
            />

            <h3 className="summary-section">🧠 Câu hỏi</h3>
            <Table
                dataSource={summary?.questions ?? []}
                rowKey="questionInGameId"
                columns={[
                    { title: 'Câu hỏi', dataIndex: 'text' },
                    { title: 'Thứ tự', dataIndex: 'OrderIndex' },
                    {
                        title: 'Tỉ lệ đúng',
                        dataIndex: 'correctAnswerRate',
                        render: (rate) => `${((rate ?? 0) * 100).toFixed(2)}%`,
                    },
                ]}
                pagination={false}
            />
        </div>
    );
};

export default Summary;
