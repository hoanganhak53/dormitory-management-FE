// assets
import { ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    ProfileOutlined
};

const overview = {
    id: 'group-overview',
    title: 'Phòng',
    type: 'group',
    children: [
        {
            id: 'overview',
            title: 'Danh sách phòng',
            type: 'item',
            url: '/overview',
            icon: icons.ProfileOutlined,
            breadcrumbs: false
        }
    ]
};

export default overview;
