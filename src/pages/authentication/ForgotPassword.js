// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// project import
import AuthForgotPassword from './auth-forms/AuthForgotPassword';
import AuthWrapper from './AuthWrapper';

const ForgotPassword = () => {
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Lấy lại mật khẩu</Typography>
                        <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                            Trở lại đăng nhập
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <AuthForgotPassword />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default ForgotPassword;
