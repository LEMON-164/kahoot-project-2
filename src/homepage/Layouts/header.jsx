import React from 'react';
import {
  Layout, 
  Button, 
  Space, 
  Input, 
  Dropdown,
  Avatar
} from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './header.css';


export const Header = () => {
  const navigate = useNavigate();
  const { Header } = Layout;
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from local storage
    localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
    console.log('Logging out');
    navigate('/'); // Redirect to login page
  };
  return (
    <Header className="custom-header">
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{ width: 300 }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <BellOutlined style={{ fontSize: 18 }} />
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: 'Profile',
                icon: <UserOutlined />,
                // onClick: () => navigate('/profile') // Navigate to the profile page
              },
              {
                key: '2',
                label: 'Logout',
                icon: <LogoutOutlined />,
                onClick: handleLogout,
              },
            ],
          }}
          placement="bottomRight"
        >
          <Button type="text" style={{ padding: 0 }}>
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Header;
