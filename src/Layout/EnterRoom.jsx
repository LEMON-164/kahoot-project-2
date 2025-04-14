import React from 'react';
import { Input, Button, Layout, Select, Switch, ConfigProvider } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import '../Styles/EnterRoom.css';

const { Content } = Layout;
const { Option } = Select;

const EnterroomtPage = () => {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#5a0fcd' } }}
    >
      <Layout className="kahoot-layout">          
        <Content className="content-wrapper">
        <h1 className="logo">QUIZZZZ!</h1>
          <div className="kahoot-box">
            
            <Input
              placeholder="Game PIN"
              size="large"
              className="pin-input"
            />
            <Button type="primary" size="large" block>
              Enter
            </Button>
          </div>
        </Content>

      </Layout>
    </ConfigProvider>
  );
};

export default EnterroomtPage;
