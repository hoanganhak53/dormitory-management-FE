// assets
import { DollarOutlined, ExceptionOutlined } from '@ant-design/icons';

// icons
const icons = {
    DollarOutlined,
    ExceptionOutlined
};

const m_fee = {
    id: 'm_fee',
    title: 'Hóa đơn',
    type: 'group',
    children: [
        {
            id: 'service-m-fee',
            title: 'Dịch vụ',
            type: 'item',
            url: '/m_fee/service',
            icon: icons.DollarOutlined
        },
        {
            id: 'room-m-fee',
            title: 'Tiền phòng',
            type: 'item',
            url: '/m_fee/room',
            icon: icons.ExceptionOutlined
        }
    ]
};

export default m_fee;
