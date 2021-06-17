import React, { useRef } from 'react';
import { supabase } from "../../../lib/api";

import { Drawer, Form, Button, Col, Row, Input, Select, Typography, notification } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function DrawerForm({ visible, editOrCreate, setVisible, client = null, setClient }) {
  const [form] = Form.useForm();
  const formRef = useRef(null);

  React.useEffect(() => {
    form.setFieldsValue({
      company: client && client?.company ? client.company : '',
      main_contact: client && client?.main_contact ? client.main_contact : '',
      main_contact_phone: client && client?.main_contact_phone ? client.main_contact_phone : '',
      main_contact_email: client && client?.main_contact_email ? client.main_contact_email : '',
    });
  }, [client]);

  const onClose = () => {
    setClient(null);
    setVisible(false);
  };

  const onSubmit = async ({
    company,
    main_contact,
    main_contact_phone,
    main_contact_email
  }) => {
    if(editOrCreate !== 'edit') {
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
    } else {
      const { data, error } = await supabase
        .from('clients')
        .update({
          company,
          main_contact,
          main_contact_phone,
          main_contact_email,
        })
        .match({ id: client.id })
    }

    notification.open({
      message: 'Success!',
      description:
        `Client Successfully ${editOrCreate !== 'edit' ? 'Created' : 'Updated'}.`,
      icon: <CheckCircleOutlined style={{ color: '#38c172' }}/>,
    });
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
        <Form id="clientForm" layout="vertical" form={form} ref={formRef} onFinish={onSubmit}>
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
                name="main_contact_phone"
                label="Contact Name"
                rules={[{ required: true, message: 'Please enter a main contact' }]}
              >
                <Input placeholder="Contact Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="main_contact_phone"
                label="Contact Phone"
              >
                <Input placeholder="Contact #" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
                name="main_contact_email"
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
