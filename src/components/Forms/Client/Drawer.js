import React, { useState, useEffect } from 'react';
import { supabase } from "../../../lib/api";

import { Drawer, Form, Button, Col, Row, Input, Select, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

export default function DrawerForm({ visible, editOrCreate, setVisible, client = null, setClient }) {
  const [form] = Form.useForm();
  //const [data, setData] = useState([])

  // useEffect(() => {
  //   console.log("Effect: ", client)
  //   if (client) setData(client);
  // }, [client])

  const onClose = () => {
    setClient(null);
    setVisible(false);
    console.log("CLIENT: ", client)
  };

  const onSubmit = async ({
    company,
    main_contact,
    main_contact_phone,
    main_contact_email
  }) => {
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          company,
          main_contact,
          main_contact_phone,
          main_contact_email,
        }
      ])
    console.log(data)
    console.log(error)
  }
  console.log("CLIENT: ", client)
  return (
    <>
      <Drawer
        title={`${client ? 'Update' : 'Create'} Client`}
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
            <Button form="clientForm" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form id="clientForm" layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true, message: 'Please enter a company name' }]}
              >
                <Input defaultValue={client?.company ? client.company : ''} placeholder="Company name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            </Col>
          </Row>
          <Title level={3}>Main Contact</Title>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="main_contact_phone"
                label="Contact Name"
                rules={[{ required: true, message: 'Please enter a main contact' }]}
              >
                <Input defaultValue={client?.main_contact_phone ? client.company : ''} placeholder="Contact Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="main_contact_phone"
                label="Contact Phone"
              >
                <Input defaultValue={client?.main_contact_phone ? client?.main_contact_phone : ''} placeholder="Contact #" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="main_contact_email"
                label="Contact Email"
              >
                <Input defaultValue={client?.main_contact_email ? client?.main_contact_email : ''} placeholder="Contact email" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
