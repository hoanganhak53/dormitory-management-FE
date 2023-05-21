// assets
import { DollarOutlined, ExceptionOutlined } from '@ant-design/icons';

// icons
const icons = {
    DollarOutlined,
    ExceptionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const fee = {
    id: 'fee',
    title: 'Hóa đơn',
    type: 'group',
    children: [
        {
            id: 'service-fee',
            title: 'Dịch vụ',
            type: 'item',
            url: '/sample-page',
            icon: icons.DollarOutlined
        },
        {
            id: 'room-fee',
            title: 'Tiền phòng',
            type: 'item',
            url: '/sample-page',
            icon: icons.ExceptionOutlined
        }
    ]
};

export default fee;
