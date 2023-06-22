// assets
import { AuditOutlined } from '@ant-design/icons';
import { TeamOutlined } from '@ant-design/icons';
import { ApartmentOutlined } from '@ant-design/icons';
import { ContainerOutlined } from '@ant-design/icons';
import { HourglassOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    AuditOutlined,
    ApartmentOutlined,
    TeamOutlined,
    ContainerOutlined,
    HourglassOutlined,
    UserOutlined,
    DashboardOutlined
};

const admin = {
    id: 'group-admin',
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
            id: 'student',
            title: 'Quản lý sinh viên',
            type: 'item',
            url: '/student',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'form',
            title: 'Form bổ sung',
            type: 'item',
            url: '/form',
            icon: icons.AuditOutlined,
            breadcrumbs: false
        },
        {
            id: 'a_registration',
            title: 'Đợt đăng ký',
            type: 'item',
            url: '/a_registration',
            icon: icons.HourglassOutlined,
            breadcrumbs: false
        },
        {
            id: 'building',
            title: 'Tòa nhà',
            type: 'item',
            url: '/apartment',
            icon: icons.ApartmentOutlined,
            breadcrumbs: false
        },
        {
            id: 'post',
            title: 'Bài viết',
            type: 'item',
            url: '/post',
            icon: icons.ContainerOutlined,
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

export default admin;
