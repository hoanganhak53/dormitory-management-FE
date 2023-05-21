// assets
import { UserOutlined, IdcardOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined,
    IdcardOutlined
};

// ==============================|| MENU ITEMS - account ||============================== //

const account = {
    id: 'account',
    title: 'Tài khoản',
    type: 'group',
    children: [
        {
            id: 'account-info',
            title: 'Sửa hồ sơ',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined
        },
        {
            id: 'account-more',
            title: 'Thông tin bổ sung',
            type: 'item',
            url: '/more',
            icon: icons.IdcardOutlined
        }
    ]
};

export default account;
