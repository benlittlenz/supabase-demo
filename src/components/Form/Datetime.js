import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

export default function InputSelect() {
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  const onOk = (value) => {
    console.log('onOk: ', value);
  }
  return (
    <Space direction="vertical" size={12}>
      <DatePicker showTime onChange={onChange} onOk={onOk} />
      <RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
      />
    </Space>
  )
}