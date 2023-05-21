// assets
import { TeamOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    TeamOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA registration ||============================== //

const registration = {
    id: 'register',
    title: 'Quản lý đăng ký',
    type: 'group',
    children: [
        {
            id: 'register2',
            title: 'Đăng ký các kỳ',
            type: 'item',
            url: '/registration/semester',
            icon: icons.ProfileOutlined
        },
        {
            id: 'register3',
            title: 'Phòng hiện tại',
            type: 'item',
            url: '/registration/current',
            icon: icons.TeamOutlined
        }
    ]
};

export default registration;
