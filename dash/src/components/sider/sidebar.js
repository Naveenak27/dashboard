import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Avatar, theme, Input,Modal } from 'antd';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';  // Correct import for PrimeReact Sidebar
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import axios from 'axios';

const { Header, Sider, Content } = Layout;

const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    role: '',
  });

  const navigate = useNavigate();
  
  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  // Clear user data
    navigate('/'); // Redirect to login page
  };
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to log out?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: handleLogout,
    });
  };

  // Fetch user data from localStorage and decode token

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        // Extract user ID from decoded token
        const userId = decodedToken.id; // Adjust this based on your token structure
        console.log('User ID:', userId);

        // Fetch user data from the server
        axios.get(`http://localhost:5000/api/logger/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Set the token in the Authorization header
          },
        })
          .then(response => {
            const userData = response.data;
            console.log(userData);
            
            setUserInfo({
              username: userData.username || decodedToken.username || 'Unknown',
              email: userData.email || decodedToken.email || 'Unknown',
              role: userData.role || decodedToken.role || 'Unknown',
            });
          })
          .catch(error => {
            console.error('Failed to fetch user details:', error);
          });
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.log('No token found in localStorage.');
    }
  }, []);
  
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left Ant Design Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'black' }}>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: 'black', color: 'white' }}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/main/page1" style={{ color: 'white' }}>Page 1</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link to="/main/page2" style={{ color: 'white' }}>Page 2</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          <Link to="/main/page3" style={{ color: 'white' }}>Page 3</Link>
        </Menu.Item>
      </Menu>
    </Sider>
      {/* Right PrimeReact Sidebar */}
      <PrimeSidebar 
      visible={visibleRight} 
      position="right" 
      onHide={() => setVisibleRight(false)} 
      style={{ backgroundColor: 'black', color: 'white' }}
    >
      <h2 style={{ color: 'white' }}>User Information</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="username" style={{ color: 'white' }}>Username</label>
          <Input
            id="username"
            value={userInfo.username}
            disabled
            placeholder="Username"
            style={{ backgroundColor: 'black', color: 'white' }}
          />
        </div>
        <div>
          <label htmlFor="role" style={{ color: 'white' }}>Role</label>
          <Input
            id="role"
            value={userInfo.role}
            disabled
            placeholder="Role"
            style={{ backgroundColor: 'black', color: 'white' }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ color: 'white' }}>Email</label>
          <Input
            id="email"
            value={userInfo.email}
            disabled
            placeholder="Email"
            style={{ backgroundColor: 'black', color: 'white' }}
          />
        </div>
      </form>
    </PrimeSidebar>      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginLeft: 16,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
            {/* Button to open the right sidebar */}
            <Avatar
              style={{ backgroundColor: '#87d068', marginRight: 16 }}
              onClick={() => setVisibleRight(true)}
              icon={<UserOutlined />}
            />
 <Button type="primary" icon={<LogoutOutlined />} onClick={showLogoutConfirm}>
      Logout
    </Button>          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: '16px',
            padding: '24px',
            background: colorBgContainer,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
