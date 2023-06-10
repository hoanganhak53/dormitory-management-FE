import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, CameraOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout, openDialog }) => {
    const theme = useTheme();
    const navigation = useNavigate();
    const role = localStorage.getItem('role');

    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
            {role == 1 && (
                <>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => {
                            handleListItemClick(event, 0);
                            navigation('/profile');
                        }}
                    >
                        <ListItemIcon>
                            <EditOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Sửa hồ sơ" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => {
                            handleListItemClick(event, 1);
                            openDialog(true);
                        }}
                    >
                        <ListItemIcon>
                            <CameraOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Đổi ảnh đại diện" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => {
                            handleListItemClick(event, 3);
                            navigation('/dashboard');
                        }}
                    >
                        <ListItemIcon>
                            <UserOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Hồ sơ" />
                    </ListItemButton>
                </>
            )}
            <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" />
            </ListItemButton>
        </List>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
