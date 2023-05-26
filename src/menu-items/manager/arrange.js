// assets
import { BlockOutlined } from '@ant-design/icons';
import { BuildOutlined } from '@ant-design/icons';

// icons
const icons = {
    BlockOutlined,
    BuildOutlined
};

const arrange = {
    id: 'group-arrange',
    title: 'Sắp xếp',
    type: 'group',
    children: [
        {
            id: 'distribute',
            title: 'Dồn phòng',
            type: 'item',
            url: '/distribute',
            icon: icons.BlockOutlined,
            breadcrumbs: false
        },
        {
            id: 'arrange',
            title: 'Sắp xếp phòng',
            type: 'item',
            url: '/arrange',
            icon: icons.BuildOutlined,
            breadcrumbs: false
        }
    ]
};

export default arrange;
