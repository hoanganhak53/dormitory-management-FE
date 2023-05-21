import Logo from 'components/Logo/Logo';
import { Box, ButtonBase, Stack, Typography } from '@mui/material/index';
import { useNavigate } from 'react-router-dom/dist/index';

const HeaderContent = () => {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ width: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <Logo />
            </Box>
            <Box sx={{ width: '100%' }} />
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <ButtonBase
                    sx={{
                        p: 0.25,
                        ml: 1,
                        bgcolor: 'transparent',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'secondary.lighter' }
                    }}
                    aria-haspopup="true"
                    onClick={() => navigate('portal')}
                >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                        <Typography variant="subtitle1">Trang chủ</Typography>
                    </Stack>
                </ButtonBase>
                <ButtonBase
                    sx={{
                        p: 0.25,
                        ml: 1,
                        bgcolor: 'transparent',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'secondary.lighter' }
                    }}
                    aria-haspopup="true"
                    onClick={() => navigate('register')}
                >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                        <Typography variant="subtitle1">Đăng ký</Typography>
                    </Stack>
                </ButtonBase>
                <ButtonBase
                    sx={{
                        p: 0.25,
                        ml: 1,
                        bgcolor: 'transparent',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'secondary.lighter' }
                    }}
                    aria-haspopup="true"
                    onClick={() => navigate('login')}
                >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                        <Typography variant="subtitle1">Đăng nhập</Typography>
                    </Stack>
                </ButtonBase>
            </Box>
        </>
    );
};

export default HeaderContent;
