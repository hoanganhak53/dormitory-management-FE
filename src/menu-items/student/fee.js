// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
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
            icon: icons.ChromeOutlined
        },
        {
            id: 'room-fee',
            title: 'Tiền phòng',
            type: 'item',
            url: '/sample-page',
            icon: icons.QuestionOutlined
        }
    ]
};

export default fee;
