import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, CardContent, ClickAwayListener, Grid, IconButton, Paper, Popper, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import avatar2 from 'assets/images/default_avatar.jpg';

// assets
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';

const Profile = ({ openDialog }) => {
    const theme = useTheme();
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        navigate('/portal');
        window.location.reload();
    };

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = 'grey.300';

    const role = localStorage.getItem('role');
    let role_name = '';
    switch (role) {
        case '1':
            role_name = 'Sinh viên';
            break;
        case '2':
            role_name = 'Quản lý tòa nhà';
            break;
        case '3':
            role_name = 'Quản lý ký túc xá';
            break;
        default:
            break;
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <ButtonBase
                sx={{
                    p: 0.25,
                    bgcolor: open ? iconBackColorOpen : 'transparent',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'secondary.lighter' }
                }}
                aria-label="open profile"
                ref={anchorRef}
                aria-controls={open ? 'profile-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                    <Avatar alt="profile user" src={user.avatar ? user.avatar : avatar2} sx={{ width: 32, height: 32 }} />
                    <Typography variant="subtitle1">{user.full_name.split(' ').pop()}</Typography>
                </Stack>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (
                            <Paper
                                sx={{
                                    boxShadow: theme.customShadows.z1,
                                    width: 290,
                                    minWidth: 240,
                                    maxWidth: 290,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 250
                                    }
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Grid item>
                                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                                        <Avatar
                                                            alt="profile user"
                                                            src={user.avatar ? user.avatar : avatar2}
                                                            sx={{ width: 32, height: 32 }}
                                                        />
                                                        <Stack>
                                                            <Typography variant="h6">{user.full_name}</Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {role_name}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton size="large" color="secondary" onClick={handleLogout}>
                                                        <LogoutOutlined />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <ProfileTab handleLogout={handleLogout} openDialog={openDialog} />
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        )}
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};

export default Profile;
