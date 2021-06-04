import React, { useState, useEffect } from "react";
import { Select } from 'antd';
import { supabase } from "../../../lib/api";

const { Option } = Select;

export default function InputSelect({ setData, user }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState({value: '', display: ''})
  useEffect(() => {
    fetchUsers()
    console.log("USER: ", user)
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

  const onChange = (value, option) => {
    console.log(`selected ${value}`, option);
    setSelected({value, display: option.children})
    setData(value)
  }
  return (
    <Select
      showSearch
      placeholder="Select a person"
      onChange={onChange}
      value={selected.display ? selected.display : user?.name}
      defaultValue={{ value: selected.value ? selected.value : user?.id }}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {users.map(data => (
        <Option key={data.id} value={data.id}>{data.name}</Option>
      ))}
    </Select>
  );
}