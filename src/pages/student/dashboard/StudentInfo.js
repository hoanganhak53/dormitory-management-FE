import React from 'react';
import MainCard from 'components/MainCard';
import { Grid, Stack, Typography } from '@mui/material/index';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'utils/auth-header';
import avatar from 'assets/images/default_avatar.jpg';
import { formatGender, formatMajor, formatTimeDate } from 'utils/fomat';

export const StudentAvatar = styled('img')(() => ({
    borderRadius: '5px',
    padding: '4px',
    backgroundColor: '#fff',
    border: '1px solid #ddd'
}));

const StudentInfo = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        let unsub = false;

        const me = async () => {
            try {
                await axiosInstance.get('profile/me').then((res) => {
                    console.log(res.data);
                    setUser(res.data.data);
                });
            } catch (err) {}
        };
        me();

        return () => {
            unsub = true;
        };
    }, []);

    return (
        <MainCard>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} md={6} lg={3} alignItems="center" justifyContent="center">
                    <Stack direction="column" alignItems="center" spacing={0}>
                        <StudentAvatar width={200} height={280} src={user.avatar ? user.avatar : avatar} alt="avatar" />
                        <Typography sx={{ fontWeight: '600', fontSize: '13px', mt: 1 }}>{user.mssv}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={4} alignItems="center" justifyContent="center">
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Họ và tên:</Typography>
                        <Typography>{user.full_name}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Chương trình:</Typography>
                        <Typography>{formatMajor(user.major)}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Giới tính:</Typography>
                        <Typography>{formatGender(user.gender)}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Khóa học:</Typography>
                        <Typography>K{user.batch || 'NA'}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Email:</Typography>
                        <Typography>{user.email || 'NA'}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6} lg={4} alignItems="center" justifyContent="center">
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Trạng thái:</Typography>
                        <Typography color={user.is_valid ? 'success.main' : 'error.main'}>
                            {user.is_valid ? 'Đã xác thực' : 'Chưa xác thực'}
                        </Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Thông tin bổ sung:</Typography>
                        <Typography color={user.is_more_info ? 'success.main' : 'error.main'}>
                            {user.is_more_info ? 'Đã hoàn tất' : 'Chưa hoàn tất'}
                        </Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Phòng:</Typography>
                        <Typography>{user.room_name || 'NA'}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Tòa nhà:</Typography>
                        <Typography>{user.apartment_name || 'NA'}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Kỳ đăng ký:</Typography>
                        <Typography>{user?.registration?.semester || 'NA'}</Typography>
                    </Stack>
                    <Stack direction="row" mb={2}>
                        <Typography sx={{ fontWeight: '600', mr: '25px' }}>Thời gian:</Typography>
                        <Typography>
                            {formatTimeDate(user?.registration?.start_date)} - {formatTimeDate(user?.registration?.end_date)}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default StudentInfo;
