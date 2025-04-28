import React, { useState } from 'react';
import {
    Layout, Menu, Input, Table, Tag, Space, Button, Avatar, Row, Col, Dropdown
} from 'antd';
import {
    UserOutlined,
    AppstoreOutlined,
    LineChartOutlined,
    SearchOutlined,
    BellOutlined,
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import './UserDashBoard.css';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const UserDashBoard = () => {
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [editedUser, setEditedUser] = useState({});

    // useEffect(() => {
    //     fetch("https://jsonplaceholder.typicode.com/users?_limit=6")
    //         .then(res => res.json())
    //         .then(users => {
    //             const mapped = users.map((u) => ({
    //                 key: u.id,
    //                 name: u.name,
    //                 email: u.email,
    //                 title: 'Software Engineer',
    //                 status: 'Active',
    //                 role: 'Owner'
    //             }));
    //             setData(mapped);
    //         });
    // }, []);

    const edit = (record) => {
        setEditingKey(record.key);
        setEditedUser({ ...record });
    };

    const save = (key) => {
        const newData = data.map(item => (item.key === key ? editedUser : item));
        setData(newData);
        setEditingKey('');
    };

    const cancel = () => setEditingKey('');

    const handleChange = (e, field) => {
        setEditedUser({ ...editedUser, [field]: e.target.value });
    };

    const createQuiz = () => {
        const newKey = 1; // tạo key duy nhất
        const newQuiz = {
            key: newKey,
            quizId:newKey, // hoặc bạn để rỗng ''
            title: '',
            description: '',
            status: 'Draft', // hoặc "Pending", "Active" tùy bạn
        };
        setData(prevData => [...prevData, newQuiz]);
        setEditingKey(newKey);
        setEditedUser(newQuiz);
    };

    const columns = [
        {
            title: 'Quizzz ID',
            dataIndex: 'quizId',
            // render: (text, record) => editingKey === record.key ? (
            //     <Input value={editedUser.name} onChange={e => handleChange(e, 'Quizzz ID')} />
            // ) : (
            //     <>
            //         <strong>{record.name}</strong><br />
            //         <small>{record.email}</small>
            //     </>
            // )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text, record) => editingKey === record.key ? (
                <Input value={editedUser.title} onChange={e => handleChange(e, 'title')} />
            ) : (
                <>
                    {record.title}<br />
                    <small>Web dev</small>
                </>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
        },
        {
            title: '',
            render: (_, record) => editingKey === record.key ? (
                <Space>
                    <Button icon={<CheckOutlined />} type="primary" onClick={() => save(record.key)} />
                    <Button icon={<CloseOutlined />} onClick={cancel} />
                </Space>
            ) : (
                <Button icon={<EditOutlined />} onClick={() => edit(record)}>Edit</Button>
            )
        }
    ];

    const handleLogout = () => {

        localStorage.removeItem('user'); // Remove user data from local storage
        localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
        console.log("Logging out");
        navigate('/'); // Redirect to login page
    };

    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200}>
                <div style={{ color: 'MenuText', padding: '20px 24px', fontWeight: 'bold', fontSize: 24 }}>
                    QUIZZZZZZ
                </div>
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>Cá nhân</Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreOutlined />}>Thư viện</Menu.Item>
                    <Menu.Item key="3" icon={<LineChartOutlined />}>Báo cáo</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
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
                                        onClick: handleLogout
                                    }
                                ]
                            }}
                            placement="bottomRight"
                        >
                            <Button type="text" style={{ padding: 0 }}>
                                <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" />
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                        <Col>
                            <h2 style={{ margin: 0 }}>Your Quizzzes</h2>
                        </Col>
                        <Col>
                            <Button type="primary"
                                icon={<EditOutlined />}
                                onClick={() => createQuiz()}
                            >
                                Create
                            </Button>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserDashBoard;
