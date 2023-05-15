// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA registration ||============================== //

const registration = {
    id: 'register',
    title: 'Quản lý đăng ký',
    type: 'group',
    children: [
        {
            id: 'register',
            title: 'Đăng ký phòng',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: true
        },
        {
            id: 'register2',
            title: 'Đăng ký các kỳ',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true
        },
        {
            id: 'register3',
            title: 'Phòng hiện tại',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};

export default registration;
