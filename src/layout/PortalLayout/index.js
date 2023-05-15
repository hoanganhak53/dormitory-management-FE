import { Outlet } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

// project import
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

const PortalLayout = () => {
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header />
            <Box component="main" sx={{ width: '100%' }}>
                <Toolbar />
                <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                <Outlet />
            </Box>
        </Box>
    );
};

export default PortalLayout;
