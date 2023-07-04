// assets
import { BlockOutlined } from '@ant-design/icons';
import { UserOutlined, DashboardOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
    BlockOutlined,
    UserOutlined,
    DashboardOutlined,
    TeamOutlined
};

const manager = {
    id: 'group-manager',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Hồ sơ',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'student-manager',
            title: 'Danh sách phòng',
            type: 'item',
            url: '/room-manager',
            icon: icons.BlockOutlined,
            breadcrumbs: false
        },
        {
            id: 'room-manager',
            title: 'Danh sách sinh viên',
            type: 'item',
            url: '/student-manager',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'account-info',
            title: 'Sửa hồ sơ',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined
        }
    ]
};

export default manager;
