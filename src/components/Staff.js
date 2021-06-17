import React, { useState, useEffect } from "react";
import { Table, Button, Typography } from "antd";
import { supabase } from "../lib/api";
import "antd/dist/antd.css"

import Drawer from './Forms/Staff/Drawer'


export default function Timesheet() {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editOrCreate, setEditOrCreate] = useState('');
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    fetchStaff()
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true)
    let { data, error } = await supabase
      .from("staff")
      .select(`
        id, staff_name, phone, email, role, dob, start_date, address
      `);

    setStaff(data)
    console.log(data)
    if (error) console.log("error", error);
    setIsLoading(false);
  };

  const onOpen = () => {
    setVisible(true)
    setStaff(null);
  }
  const onEditOpen = (record) => {
    setEditOrCreate('Edit');
    setVisible(true);
    setStaff(record);
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "5%"
    },
    {
      title: "Name",
      dataIndex: "staff_name",
      width: "20%"
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "20%"
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%"
    },
    {
      title: "Edit",
      width: "5%",
      render: (_, record) => {
        return (
          <span>
            <Typography.Link onClick={() => onEditOpen(record)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Typography.Link>
          </span>
        )
      }
    }
  ];

  return (
    <div>
      <div className="flex justify-items-end" style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={onOpen}>
          Create Staff
        </Button>
      </div>
      <Table
        pagination={{ pageSize: 50 }}
        size={"small"}
        columns={columns}
        dataSource={staff}
        loading={isLoading}
        rowKey="id"
      />
      <Drawer
        visible={visible}
        editOrCreate={editOrCreate}
        setVisible={setVisible}
        staff={staff}
        setStaff={setStaff}
      />
    </div>
  );
};
