import React, { useEffect } from 'react';
import { Button, Grid, Stack, Typography } from '../../../../node_modules/@mui/material/index';
import { StudentAvatar } from 'pages/student/dashboard/StudentInfo';
import { axiosInstance } from 'utils/auth-header';
import avatar from 'assets/images/default_avatar.jpg';
import { formatGender, formatMajor, formatTimeDate } from 'utils/fomat';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const StudentPopup = ({ user, close }) => {
    const dispatch = useDispatch();
    const [student, setStudent] = React.useState({});

    useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get(`profile/${user.id}`).then(async (res) => {
                    setStudent(res.data.data);
                    console.log(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, []);

    const submit = async () => {
        try {
            await axiosInstance.put(`student/toggle/valid/${user.id}`).then((res) => {
                dispatch(
                    openSnackBar({
                        message: res.data.message,
                        status: 'success'
                    })
                );

                close();
            });
        } catch (err) {}
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={3.75} justifyContent="space-between">
            <Grid item xs={12} md={6} lg={3}>
                <Stack direction="column" alignItems="center" spacing={0}>
                    <StudentAvatar width={200} height={280} src={student.avatar ? student.avatar : avatar} alt="avatar" />
                    <Typography sx={{ fontWeight: '600', fontSize: '13px', mt: 1 }}>{student.mssv}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Họ và tên:</Typography>
                    <Typography>{student.full_name}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Chương trình:</Typography>
                    <Typography>{formatMajor(student.major)}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Giới tính:</Typography>
                    <Typography>{formatGender(student.gender)}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Khóa học:</Typography>
                    <Typography>K{student.batch || 'NA'}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Email:</Typography>
                    <Typography>{student.email || 'NA'}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Số điện thoại:</Typography>
                    <Typography>{student.phonenumber || 'NA'}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Ngày sinh:</Typography>
                    <Typography>{student.birth || 'NA'}</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Trạng thái:</Typography>
                    <Typography color={student.is_valid ? 'success.main' : 'error.main'}>
                        {student.is_valid ? 'Đã xác thực' : 'Chưa xác thực'}
                    </Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Thông tin bổ sung:</Typography>
                    <Typography color={student.is_more_info ? 'success.main' : 'error.main'}>
                        {student.is_more_info ? 'Đã hoàn tất' : 'Chưa hoàn tất'}
                    </Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Phòng:</Typography>
                    <Typography>{student.room_name || 'NA'}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Tòa nhà:</Typography>
                    <Typography>{student.apartment_name || 'NA'}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Kỳ đăng ký:</Typography>
                    <Typography>{student?.registration?.semester || 'NA'}</Typography>
                </Stack>
                <Stack direction="row" mb={2}>
                    <Typography sx={{ fontWeight: '600', mr: '25px' }}>Thời gian:</Typography>
                    <Typography>
                        {formatTimeDate(student?.registration?.start_date)} - {formatTimeDate(student?.registration?.end_date)}
                    </Typography>
                </Stack>
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submit}>Hủy xác thực</Button>
            </Grid>
        </Grid>
    );
};

export default StudentPopup;
