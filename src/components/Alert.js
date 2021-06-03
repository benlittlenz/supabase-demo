import { Button, notification, Space } from 'antd';

export default function AlertMsg({ message, type }) {
    return notification[type]({
        message: 'Success',
        description: message
    });
}