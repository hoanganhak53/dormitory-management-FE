// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
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
            url: '/typography',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'account-more',
            title: 'Thông tin bổ sung',
            type: 'item',
            url: '/color',
            icon: icons.BgColorsOutlined
        }
    ]
};

export default account;
