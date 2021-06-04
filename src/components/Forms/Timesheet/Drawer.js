import React, { useState, useEffect } from 'react';
import { supabase } from "../../../lib/api";

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import InputSelect from './Select'
import Datetime from './Datetime'

const { Option } = Select;

export default function DrawerForm({ visible, editOrCreate, setVisible, timesheet = null, setTimesheet }) {
  const [user, setUser] = useState(null);
  const [start, setStart] = useState(null);
  const [finish, setFinish] = useState(null);
  const [data, setData] = useState([])

  useEffect(() => {
    console.log("Effect: ", timesheet)
    if(timesheet) setData(timesheet);
  }, [timesheet])

  const onClose = () => {
    setVisible(false)
  };

  const onSubmit = async () => {
    const { data, error } = await supabase
      .from('timesheet')
      .insert([
        {
          user_id: user,
          started_at: start,
          stopped_at: finish,
          total_hours: 4,
         }
      ])
      console.log(data)
      console.log(error)
  }

  return (
    <>
      <Drawer
        title={editOrCreate === 'Edit' ? 'Edit Timesheet' : 'Create Timesheet'}
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
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <InputSelect setData={setUser} user={timesheet?.users} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start"
                label="Start"
                rules={[{ required: true, message: 'Please select a start date & time' }]}
              >
                <Datetime editOrCreate={editOrCreate} date={timesheet?.started_at} setData={setStart} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="finish"
                label="Finish"
                rules={[{ required: true, message: 'Please select a finish date & time' }]}
              >
                <Datetime date={timesheet?.stopped_at} setData={setFinish}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={trigger => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}