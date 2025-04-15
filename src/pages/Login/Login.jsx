import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Divider,
  Typography,
  Space,
  Tooltip,
  Row,
  Col
} from 'antd';
import { 
  GoogleOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [showDomain, setShowDomain] = useState(false);
  const [username, setUsername] = useState('');

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setShowDomain(value.includes('@'));
  };

  return (
    <Row 
      justify="center" 
      align="middle" 
      style={{ 
        minHeight: '100vh',
        background: '#f0f2f5'
      }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={{ 
          padding: 24,
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
            Đăng nhập
          </Title>
          
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập hoặc email!' }]}
            >
              <Tooltip title="Nhập email của bạn" placement="topLeft">
                <Input 
                  prefix={<UserOutlined />}
                  placeholder="example@gmail.com"
                  onChange={handleUsernameChange}
                  addonAfter={showDomain ? null : <span style={{ opacity: 0.5 }}>@gmail.com</span>}
                />
              </Tooltip>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Mật khẩu" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block
                style={{ marginBottom: 16 }}
              >
                Đăng nhập
              </Button>

              <div style={{ textAlign: 'center' }}>
                <Button type="link" style={{ padding: 0 }}>
                  <Text strong>Đặt lại mật khẩu</Text>
                </Button>
              </div>
            </Form.Item>

            <Divider plain>hoặc</Divider>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                icon={<GoogleOutlined />} 
                block
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Tiếp tục với Google
              </Button>
            </Space>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Text>Bạn không có tài khoản? </Text>
              <Button type="link" style={{ padding: 0 }}>
                <Text strong>Đăng ký</Text>
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;