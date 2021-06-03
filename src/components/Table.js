import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { supabase } from "../lib/api";
import "antd/dist/antd.css";

import Drawer from './Drawer';
import Alert from './Alert';

export default function TableDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [timesheets, setTimesheets] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchTimesheets()
  }, []);

  const fetchTimesheets = async () => {
    setIsLoading(true)
    let { data, error } = await supabase
      .from("timesheet")
      .select(`
              id, started_at, stopped_at, total_hours, approved,
              users (name)
      `)
    //.order('id', { ascending: true })
    setTimesheets(data)
    console.log(data)
    if (error) console.log("error", error);
    setIsLoading(false);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "5%"
    },
    {
      title: "User",
      dataIndex: ['users', 'name'],
      width: "20%"
    },
    {
      title: "Started",
      dataIndex: "started_at",
    },
    {
      title: "Finished",
      dataIndex: "stopped_at",
      width: "20%"
    },
    {
      title: "Total Hours",
      dataIndex: "total_hours",
      width: "20%"
    },
    {
      title: "Approved",
      dataIndex: "approved",
      width: "20%"
    }
  ];

  const rowSelection = {
    onChange: rows => {
      console.log("ROWS: ", rows)
      setSelectedRows(rows)
    },
  };

  const updateRecords = async () => {
    console.time('update')
    setIsApproving(true)
    for(let i = 0; i < selectedRows.length; i++) {
      console.log(i)
      const { data, error } = await supabase
        .from('timesheets')
        .update({ approved: 'Yes' })
        .match({ id: selectedRows[i]})
    }
    console.timeEnd('update')
    setIsApproving(false);

    setMessage(`Finished approving ${selectedRows.length} records`)
  }

  const onOpen = () => setVisible(true)
  // const onClose = () => setVisible(false)

  return (
    <div>
      {message && <Alert type="success" message={message}/>}
      <div className="flex justify-items-end" style={{ marginBottom: 16 }}>
        <Button type="primary"
          onClick={updateRecords}
          loading={isApproving}
          >
          Approve
        </Button>
        <Button type="primary"
          onClick={onOpen}>
          Create Timesheet
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        pagination={{ pageSize: 50 }}
        size={"small"}
        columns={columns}
        dataSource={timesheets}
        loading={isLoading}
        rowKey="id"
      />
      <Drawer
        //onClose={onClose}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};