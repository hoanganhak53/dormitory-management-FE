// assets
import { DashboardOutlined } from '@ant-design/icons';
import { HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Điều hướng',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Bảng điều khiển',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'portal',
            title: 'Trang chủ',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.HomeOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
