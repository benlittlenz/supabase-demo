import React, { useState, useEffect } from "react";
import { Select } from 'antd';
import { supabase } from "../../lib/api";

const { Option } = Select;

export default function InputSelect() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = async () => {
    let { data, error } = await supabase
      .from("users")
      .select(`
              id, name
      `)
    setUsers(data)
    console.log(data)
    if (error) console.log("error", error);
  };

  const onChange = value => {
    console.log(`selected ${value}`);
  }
  return (
    <Select
      showSearch
      placeholder="Select a person"
      onChange={onChange}
      // onFocus={onFocus}
      // onBlur={onBlur}
      // onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {users.map(user => (
        <Option key={user.id} value={user.name}>{user.name}</Option>
      ))}
    </Select>
  );
}