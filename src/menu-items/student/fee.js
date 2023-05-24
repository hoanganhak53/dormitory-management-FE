// assets
import { DollarOutlined, ExceptionOutlined } from '@ant-design/icons';

// icons
const icons = {
    DollarOutlined,
    ExceptionOutlined
};

const fee = {
    id: 'fee',
    title: 'Hóa đơn',
    type: 'group',
    children: [
        {
            id: 'service-fee',
            title: 'Dịch vụ',
            type: 'item',
            url: '/fee/service',
            icon: icons.DollarOutlined
        },
        {
            id: 'room-fee',
            title: 'Tiền phòng',
            type: 'item',
            url: '/fee/room',
            icon: icons.ExceptionOutlined
        }
    ]
};

export default fee;
