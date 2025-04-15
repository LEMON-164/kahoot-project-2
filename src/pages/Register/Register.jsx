// src/App.jsx
import React from 'react';
import { Card, Typography, Space } from 'antd';
import '../App.css';

const { Title } = Typography;

const App = () => {
  const accountTypes = [
    {
      title: 'NGƯỜI DẠY HỌC',
      color: '#0066CC',
      icon: '📊',
      description: 'Giáo viên',
    },
    {
      title: 'GIÁO VIÊN',
      color: '#FF3333',
      icon: '📖',
      description: 'Giáo viên',
    },
    {
      title: 'HỌC SINH',
      color: '#FF9900',
      icon: '👤',
      description: 'Học sinh',
    },
    {
      title: 'GIÁ ĐÌNH & BẠN BÈ',
      color: '#00CC66',
      icon: '👥',
      description: 'Gia đình & Bạn bè',
    },
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="logo">kahoot!</div>
        <div className="language">🇻🇳 VI</div>
      </div>

      {/* Main Content */}
      <div className="content">
        <Title level={3} className="title">
          Chọn loại tài khoản của bạn
        </Title>
        <Space wrap size="large" className="card-container">
          {accountTypes.map((account, index) => (
            <Card
              key={index}
              hoverable
              className="account-card"
              bodyStyle={{ padding: '16px' }}
            >
              <div
                className="card-header"
                style={{ backgroundColor: account.color }}
              >
                <div className="card-icon">{account.icon}</div>
              </div>
              <div className="card-content">
                <div className="card-title">{account.title}</div>
                <div className="card-description">{account.description}</div>
              </div>
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default App;