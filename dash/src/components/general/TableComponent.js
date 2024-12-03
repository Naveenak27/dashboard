// components/TableComponent.js
import React, { useState } from 'react';
import { Table, Button, Popconfirm, Form, Input } from 'antd';

const TableComponent = ({ columns, dataSource, onEdit, onDelete }) => {
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      onEdit(key, row);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const actionColumn = {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Button
            onClick={() => save(record.key)}
            type="link"
            style={{ marginRight: 8 }}
          >
            Save
          </Button>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <Button type="link">Cancel</Button>
          </Popconfirm>
        </span>
      ) : (
        <>
          <Button
            type="link"
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => onDelete(record.key)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      );
    },
  };

  const mergedColumns = [...columns, actionColumn];

  return (
    <Form form={form} component={false}>
      <Table
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default TableComponent;
