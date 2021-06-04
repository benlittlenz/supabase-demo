import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
const { RangePicker } = DatePicker;

export default function InputSelect({ editOrCreate, setData, date }) {
  const [editDate, setEditDate] = useState(null);
  const [editTime, setEditTime] = useState(null);

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  const onOk = (value) => {
    console.log('onOk: ', moment(value).format())
    setData(value)
  }
  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime={{ format: 'HH:mm' }}
        format="DD/MM/YYYY HH:mm"
        defaultValue={editOrCreate === 'Edit' ? moment(date) : ''}
        showTime
        onChange={onChange}
        onOk={onOk} />
    </Space>
  )
}