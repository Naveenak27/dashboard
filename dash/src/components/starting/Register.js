import React, { useState } from 'react';
import { Button, Form, Input, notification, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', values);
      notification.success({
        message: 'Registration Successful',
        description: 'You can now log in.',
      });
      navigate('/');
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response.data.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card
        title="Register"
        style={{ width: 400, padding: '20px' }}
        bordered={false}
      >
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 300, margin: 'auto' }}
        >
          <Form.Item 
            label="Email" 
            name="email" 
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item 
            label="Password" 
            name="password" 
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item 
            label="Username" 
            name="username" 
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item 
            label="Role" 
            name="role" 
            rules={[{ required: true, message: 'Please select your role!' }]}
          >
            <Input placeholder="Enter your role" />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              style={{ width: '100%' }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span>Already have an account? </span>
          <a href="/">Login here</a>
        </div>
      </Card>
    </div>
  );
};

export default Register;
