import { Box, Grid, Stack, Typography } from '@mui/material';

import OverviewCard from 'components/cards/statistics/OverviewCard';

import StudentInfo from './StudentInfo';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/auth-header';

const DashboardDefault = () => {
    const [overview, setOverview] = useState({});

    useEffect(() => {
        let unsub = false;
        const init = async () => {
            try {
                await axiosInstance.get('auth/overview').then((res) => {
                    setOverview(res.data.data);
                    console.log(res.data.data);
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, []);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Thông tin sinh viên</Typography>
            </Grid>
            <Grid item xs={12} md={10} lg={12}>
                <StudentInfo />
            </Grid>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Tổng quan</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <OverviewCard title="Sinh viên" count={overview.student_num} des="Tổng số tài khoản" bgColor="success.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <OverviewCard title="Cán bộ" count={overview.manager_num} des="Tổng tài khoản cán bộ" bgColor="error.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <OverviewCard title="Đăng ký" count={overview.registration_num} des="Tổng số đăng ký" bgColor="warning.main" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <OverviewCard title="Phòng" count={overview.room_num} des="Tổng số phòng" bgColor="primary.main" />
            </Grid>
            {/* <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid item xs={12} md={6} lg={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Tiền dịch vụ</Typography>
                    </Grid>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                Tiền dịch vụ hàng tháng
                            </Typography>
                            <Typography variant="h3">72,650VND</Typography>
                        </Stack>
                    </Box>
                    <MonthlyBarChart />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Tiền phòng</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                TIền phòng các kỳ
                            </Typography>
                            <Typography variant="h3">72,650VND</Typography>
                        </Stack>
                    </Box>
                    <MonthlyBarChart />
                </MainCard>
            </Grid> */}
        </Grid>
    );
};

export default DashboardDefault;
