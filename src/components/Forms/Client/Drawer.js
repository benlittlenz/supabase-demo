import React, { useState, useEffect } from 'react';
import { supabase } from "../../../lib/api";

import { Drawer, Form, Button, Col, Row, Input, Select, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

const { Option } = Select;

export default function DrawerForm({ visible, editOrCreate, setVisible, client = null, setClient }) {
  const [form] = Form.useForm();

  const [user, setUser] = useState(null);
  const [start, setStart] = useState(null);
  const [finish, setFinish] = useState(null);
  const [data, setData] = useState([])

  useEffect(() => {
    console.log("Effect: ", client)
    if (client) setData(client);
  }, [client])

  const onClose = () => {
    setVisible(false)
  };

  const onSubmit = async (data) => {
    console.log("DATA: ", data)
    // const { data, error } = await supabase
    //   .from('client')
    //   .insert([
    //     {
    //       user_id: user,
    //       started_at: start,
    //       stopped_at: finish,
    //       total_hours: 4,
    //     }
    //   ])
    // console.log(data)
    // console.log(error)
  }

  return (
    <>
      <Drawer
        title={'Create Client'}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
              </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true, message: 'Please enter a company name' }]}
              >
                <Input placeholder="Company name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            </Col>
          </Row>
          <Title level={3}>Main Contact</Title>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="main_contact"
                label="Contact Name"
                rules={[{ required: true, message: 'Please enter a main contact' }]}
              >
                <Input placeholder="Contact Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="contact_phone"
                label="Contact Phone"
              >
                <Input placeholder="Contact #" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="main_email"
                label="Contact Email"
              >
                <Input placeholder="Contact email" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
