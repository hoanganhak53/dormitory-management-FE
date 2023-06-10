// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import CustomDialog from 'components/CustomDialog';
import React from 'react';
import ChangeAvatar from './ChangeAvatar';

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            <Notification />
            {!matchesXs && <Profile openDialog={setOpenDialog} />}
            {matchesXs && <MobileSection />}

            <CustomDialog
                title="Đổi ảnh đại diện"
                width="xs"
                bodyComponent={<ChangeAvatar close={() => setOpenDialog(false)} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </>
    );
};

export default HeaderContent;
