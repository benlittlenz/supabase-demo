import React, { useRef } from 'react';
import { supabase } from "../../../lib/api";

import { Drawer, Form, Button, Col, Row, Input, DatePicker, Typography, notification } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
const { Title } = Typography;

export default function DrawerForm({ visible, editOrCreate, setVisible, staff = null, setStaff }) {
  const [form] = Form.useForm();
  const formRef = useRef(null);

  React.useEffect(() => {
    form.setFieldsValue({
      staff_name: staff && staff?.staff_name ? staff.staff_name : '',
      phone: staff && staff?.phone ? staff.phone : '',
      email: staff && staff?.email ? staff.email : '',
      role: staff && staff?.role ? staff.role : '',
      dob: staff && staff?.dob ? staff.dob : '',
      start_date: staff && staff?.start_date ? staff.start_date : '',
      address: staff && staff?.address ? staff.address : '',
    });
  }, [staff]);

  const onClose = () => {
    setStaff(null);
    setVisible(false);
  };

  const onSubmit = async ({
    staff_name,
    phone,
    email,
    role,
    dob,
    start_date,
    address
  }) => {
    if (editOrCreate !== 'edit') {
      const { data, error } = await supabase
        .from('staff')
        .insert([
          {
            staff_name,
            phone,
            email,
            role,
            dob,
            start_date,
            address
          }
        ])

      console.log(data)
    } else {
      const { data, error } = await supabase
        .from('staff')
        .update({
          staff_name,
          phone,
          email,
          role,
          dob,
          start_date,
          address
        })
        .match({ id: staff.id })
    }

    notification.open({
      message: 'Success!',
      description:
        `Staff Successfully ${editOrCreate !== 'edit' ? 'Created' : 'Updated'}.`,
      icon: <CheckCircleOutlined style={{ color: '#38c172' }} />,
    });
  }
  console.log("staff: ", staff)
  return (
    <>
      <Drawer
        title={`${staff ? 'Update' : 'Create'} Staff`}
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
            <Button form="staffForm" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        }
      >
        <Form id="staffForm" layout="vertical" form={form} ref={formRef} onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="staff_name"
                label="Staff Name"
                rules={[{ required: true, message: 'Please enter a staff name' }]}
              >
                <Input placeholder="Staff Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Contact Phone"
              >
                <Input placeholder="Contact #" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Contact Email"
              >
                <Input placeholder="Contact email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Position"
              >
                <Input placeholder="Position" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
              >
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dob"
                label="Date of Birth"

              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="start_date"
                label="Start Date"
              >
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
