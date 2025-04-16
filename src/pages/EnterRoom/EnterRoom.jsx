import React from 'react';
import { Input, Button, Layout, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom'; 
import '../EnterRoom/EnterRoom.css';

const { Content } = Layout;

const EnterroomPage = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#5a0fcd' } }}>
      <Layout className="kahoot-layout">
        <div className="centered-content">
          <h1 className="logo">QUIZZZZ!</h1>

          <div className="kahoot-box">
            <Input
              placeholder="Game PIN"
              size="large"
              className="pin-input"
            />
            <Link to="/lobby">
              <Button
                type="primary"
                size="large"
                block
                className="enter-button"
              >
                Enter
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default EnterroomPage;