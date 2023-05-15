// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const role = localStorage.getItem('role');
    let menus = [];
    switch (role) {
        case '1':
            menus = menuItem.student;
            break;
        case '2':
            menus = menuItem.manager;
            break;
        case '3':
            menus = menuItem.admin;
            break;
        default:
            break;
    }
    const navGroups = menus.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
