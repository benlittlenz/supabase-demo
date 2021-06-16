import React, { useState, useEffect } from "react";
import { Table, Button, Typography } from "antd";
import { supabase } from "../lib/api";
import "antd/dist/antd.css";

import Drawer from './Forms/Job/Drawer';
import Alert from './Alert';

export default function Timesheet() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false);
  const [editOrCreate, setEditOrCreate] = useState('');
  const [timesheet, setTimesheet] = useState(null);

  useEffect(() => {
    fetchJobs()
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true)
    let { data, error } = await supabase
      .from("jobs")
      .select(`
              id, job_name, site_address, start_date, finish_date,
              clients (id, company)
      `)
    //.order('id', { ascending: true })
    setJobs(data)
    console.log(data)
    if (error) console.log("error", error);
    setIsLoading(false);
  };

  const rowSelection = {
    onChange: rows => {
      console.log("ROWS: ", rows)
      setSelectedRows(rows)
    },
  };

  const updateRecords = async () => {
    console.time('update')
    setIsApproving(true)
    for (let i = 0; i < selectedRows.length; i++) {
      console.log(i)
      const { data, error } = await supabase
        .from('timesheets')
        .update({ approved: 'Yes' })
        .match({ id: selectedRows[i] })
    }
    console.timeEnd('update')
    setIsApproving(false);

    setMessage(`Finished approving ${selectedRows.length} records`)
  }

  const onOpen = () => setVisible(true)
  const onEditOpen = (record) => {
    setEditOrCreate('Edit');
    setVisible(true);
    setTimesheet(record);
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "5%"
    },
    {
      title: "Company",
      dataIndex: "job_name",
      width: "20%"
    },
    {
      title: "Main Contact",
      dataIndex: "site_address",
    },
    {
      title: "Main Contact",
      dataIndex: "start_date",
      width: "20%"
    },
    {
      title: "Main Contact",
      dataIndex: "finish_date",
      width: "20%"
    },
    {
      title: "Main Contact",
      dataIndex: ["clients", 'company'],
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
      {message && <Alert type="success" message={message} />}
      <div className="flex justify-items-end" style={{ marginBottom: 16 }}>

        <Button type="primary" onClick={onOpen}>
          Create Client
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        pagination={{ pageSize: 50 }}
        size={"small"}
        columns={columns}
        dataSource={jobs}
        loading={isLoading}
        rowKey="id"
      />
      <Drawer
        visible={visible}
        editOrCreate={editOrCreate}
        setVisible={setVisible}
        timesheet={timesheet}
        setTimesheet={setTimesheet}
      />
    </div>


  );
};
