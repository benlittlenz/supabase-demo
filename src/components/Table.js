import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { supabase } from "../lib/api";
import "antd/dist/antd.css";

export default function TableDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchPosts()
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase
      .from("posts")
      .select(`
              id, added, content, approved,
              users (name)
        `)

    //.order('id', { ascending: true })
    setPosts(data)
    console.log(posts)
    if (error) console.log("error", error);
    setIsLoading(false);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "20%"
    },
    {
      title: "Added",
      dataIndex: "added",
    },
    {
      title: "Content",
      dataIndex: "content",
      width: "20%"
    },
    {
      title: "User",
      dataIndex: "users.name",
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
    for(let i = 0; i < selectedRows.length; i++) {
      console.log(i)
      const { data, error } = await supabase
        .from('posts')
        .update({ approved: 'Yes' })
        .match({ id: selectedRows[i]})
    }
    console.timeEnd('update')
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary"
          onClick={updateRecords}>
          Reload
          </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        pagination={{ pageSize: 50 }}
        size={"small"}
        columns={columns}
        dataSource={posts}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};