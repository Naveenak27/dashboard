import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, Table, Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAsync, addUserAsync, updateUserAsync, deleteUserAsync } from '../redux/usersSlice';

const Page1 = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id', 
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  const handleEdit = (record) => {
    setIsEditing(true);
    setCurrentUser(record);
    form.setFieldsValue(record); 
    setIsModalVisible(true); 
  };

  const handleDelete = (id) => {
    dispatch(deleteUserAsync(id));
  };

  const handleAdd = (values) => {
    dispatch(addUserAsync(values));
    setIsModalVisible(false); 
    form.resetFields(); 
  };

  const handleUpdate = (values) => {
    const updatedUser = { ...currentUser, ...values, id: currentUser.id };
    dispatch(updateUserAsync(updatedUser));
    setIsModalVisible(false); 
    setIsEditing(false); 
    setCurrentUser(null); 
    form.resetFields(); 
  };
  
  const showModal = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields(); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
    form.resetFields();
  };

  return (
    <div>
      <h2>User Table</h2>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add User
      </Button>

      {/* Loading spinner */}
      {status === 'loading' && <Spin />}

      {/* Error alert */}
      {error && <Alert message="Error" description={error} type="error" showIcon />}

      {/* Table with user data */}
      {users && users.length > 0 ? (
        <Table
          columns={columns}
          dataSource={users} 
          rowKey="id" 
          pagination={{ pageSize: 5 }}
        />
      ) : (
        <p>No users found</p>
      )}

      {/* Modal Form for Adding and Editing Users */}
      <Modal
        title={isEditing ? 'Edit User' : 'Add New User'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={isEditing ? handleUpdate : handleAdd}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the user name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please input the user position!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: 'Please input the user department!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Please input the user salary!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update User' : 'Add User'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Page1;
