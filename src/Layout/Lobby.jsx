// src/Layout/Lobby.jsx
import React, { useState } from 'react';
import { Input, Button, Typography, List, Card, message } from 'antd';
import '../Styles/Lobby.css';

const { Title } = Typography;

const Lobby = () => {
    const [gamePin, setGamePin] = useState('387 9574'); // Có thể random hoặc lấy từ props
    const [nickname, setNickname] = useState('');
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState([]);
    const [isStarted, setIsStarted] = useState(false);

    const handleJoin = () => {
        if (!nickname || !teamName) {
            message.warning('Vui lòng nhập cả tên và tên nhóm!');
            return;
        }
        const newPlayer = {
            name: nickname,
            team: teamName,
            id: Date.now(),
        };
        setPlayers([...players, newPlayer]);
        setNickname('');
        setTeamName('');
    };


    const handleStart = () => {
        if (players.length < 1) {
            message.error('Phải có ít nhất 1 người chơi để bắt đầu!');
            return;
        }
        setIsStarted(true);
        message.success('Trò chơi bắt đầu!');
    };

    return (
        <div className="lobby-container">

            <div className="pin-header">
                <span className="pin-text">
                    Join at <b>www.kahoot.it</b> with Game PIN: <b>{gamePin}</b>
                </span>
            </div>

            <div className="title-bar">
                <h1 className="logo">QUIZZZZ!</h1>
                <Button
                    className="button-s"
                    onClick={handleStart}
                    disabled={players.length === 0 || isStarted}
                >
                    Bắt đầu
                </Button>

            </div>

            <div className="lobby-input">
                <Input
                    placeholder="Nhập tên của bạn"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    style={{ marginBottom: '1rem', width: 400, height: 50 }}
                />

            </div>
            <div className="lobby-input">
                <Input
                    placeholder="Nhập nhóm của bạn"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    style={{ marginBottom: '1rem', width: 400, height: 50 }}
                />
            </div>
            <div className='button'>
                <Button type="primary" block style={{ backgroundColor: 'white', color: 'black', padding: '30px 30px', fontWeight: 'bold' }} onClick={handleJoin}>
                    Tham gia
                </Button>
            </div>
            <div className="player-list">
                <Title level={3} style={{ color: 'white' }}>Người chơi ({players.length}):</Title>
                {players.length > 0 ? (
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={players}
                        renderItem={(player) => (
                            <List.Item>
                                <Card title={player.name}>
                                    Nhóm: <b>{player.team}</b>
                                </Card>
                            </List.Item>
                        )}
                    />
                ) : (
                    <div className="waiting-message">Waiting for players...</div>
                )}
            </div>


        </div>
    );
};

export default Lobby;
