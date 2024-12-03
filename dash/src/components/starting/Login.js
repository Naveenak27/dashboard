import React, { useState } from 'react';
import { Button, Form, Input, notification, Typography, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('token', response.data.token);
      navigate('/main');
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.response.data.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };
  // <a href="https://ibb.co/j5GdhQ4"><img src="https://i.ibb.co/qn9zBc1/730-generated.jpg" alt="730-generated" border="0"></a>

  return (
    <div style={styles.container}>
            <div style={styles.imageContainer}>
        <img
          src="https://i.ibb.co/qn9zBc1/730-generated.jpg" // Replace this with your actual image URL
          alt="Login Illustration"
          style={styles.image}
        />
      </div>

      <div style={styles.formContainer}>
        <div style={{ maxWidth: 400, margin: 'auto', padding: '20px', border: '1px solid #d9d9d9', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>Login</Title>
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
            <div>
              <Link to="/register">Don't have an account? Register here</Link>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100vh',
    padding: '0 20px',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '500px', // Adjust the size of the image as needed
    height: 'auto',
  },
};

export default Login;
