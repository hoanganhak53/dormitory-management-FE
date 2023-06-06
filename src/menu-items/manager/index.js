// assets
import { BlockOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    BlockOutlined,
    UserOutlined
};

const manager = {
    id: 'group-manager',
    title: '',
    type: 'group',
    children: [
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
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default manager;
