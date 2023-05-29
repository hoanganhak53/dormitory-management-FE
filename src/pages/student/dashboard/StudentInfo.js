import React from 'react';
import MainCard from 'components/MainCard';
import { Grid, Stack, Typography } from '@mui/material/index';
import { styled } from '@mui/material/styles';

export const StudentAvatar = styled('img')(() => ({
    borderRadius: '5px',
    padding: '4px',
    backgroundColor: '#fff',
    border: '1px solid #ddd'
}));

const StudentInfo = () => {
    return (
        <MainCard>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} md={6} lg={3} alignItems="center" justifyContent="center">
                    <Stack direction="column" alignItems="center" spacing={0}>
                        <StudentAvatar
                            width={200}
                            height={280}
                            src="https://kenh14cdn.com/2018/10/19/mona-lisa-15399382451312132235581.jpg"
                            alt="avatar"
                        />
                        <Typography sx={{ fontWeight: '600', fontSize: '13px', mt: 1 }}>20193980</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={4} alignItems="center" justifyContent="center">
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Họ và tên:</Typography>
                        <Typography>Nguyễn Duy Hoàng Anh</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Chương trình:</Typography>
                        <Typography>Khoa học Máy tính 2019</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Giới tính:</Typography>
                        <Typography>Nam</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Khóa học:</Typography>
                        <Typography>64</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Email:</Typography>
                        <Typography>anh.ngh@gmail.com</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={4} alignItems="center" justifyContent="center">
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Trạng thái:</Typography>
                        <Typography color="success.main">Đã xác thực</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Thông tin bổ sung:</Typography>
                        <Typography color="success.main">Đã hoàn tất</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Phòng:</Typography>
                        <Typography>211</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Tòa nhà:</Typography>
                        <Typography>B3</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Kỳ đăng ký:</Typography>
                        <Typography>20222</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Thời gian:</Typography>
                        <Typography>30/3/2023 - 20/8/2023</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default StudentInfo;
