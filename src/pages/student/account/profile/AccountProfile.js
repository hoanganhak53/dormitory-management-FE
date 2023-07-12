import React, { useEffect, useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, TextField, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import MainCard from 'components/MainCard';
import { MenuItem, Typography } from '@mui/material/index';
import { batchs, genders, majors } from 'constanst/index';
import DatePicker from 'components/DatePicker';
import { Chip } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import ChangePassword from './ChangePassword';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from 'react-redux';
import { openSnackBar } from 'store/reducers/menu';

const AccountProfile = () => {
    const role = localStorage.getItem('role');

    const [openDialog, setOpenDialog] = React.useState(false);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        let unsub = false;

        const me = async () => {
            try {
                await axiosInstance.get('profile/me').then((res) => {
                    console.log(res.data.data);
                    setUser(res.data.data);
                });
            } catch (err) {}
        };
        me();

        return () => {
            unsub = true;
        };
    }, []);

    if (role != 1) {
        return (
            <MainCard title="Quản lý hồ sơ" secondary={<Button onClick={() => setOpenDialog(true)}>Đổi mật khẩu</Button>}>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        email: user.email,
                        full_name: user.full_name || ''
                    }}
                    validationSchema={Yup.object().shape({
                        full_name: Yup.string().max(255, 'Tên quá dài').required('Bắt buộc')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            setStatus({ success: false });
                            setSubmitting(false);

                            const new_values = values;
                            delete new_values.email;
                            await axiosInstance.put('profile/change', new_values).then((res) => {
                                setUser(res.data.data);

                                dispatch(
                                    openSnackBar({
                                        message: res.data.message,
                                        status: 'success'
                                    })
                                );
                            });
                        } catch (err) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                        console.log(values);
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3} px={30} pt={2}>
                                <Grid item xs={12}>
                                    <Stack spacing={1} direction="row" alignItems="center">
                                        <InputLabel htmlFor="email-login" sx={{ width: '150px' }}>
                                            Email
                                        </InputLabel>
                                        <Typography sx={{ width: '100%' }}>{values.email}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1} direction="row" alignItems="center">
                                        <InputLabel htmlFor="full_name" sx={{ width: '150px' }}>
                                            Họ và tên
                                        </InputLabel>
                                        {true ? (
                                            <TextField
                                                id="full_name"
                                                type="text"
                                                value={values.full_name}
                                                name="full_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Nhập họ và tên"
                                                fullWidth
                                                error={Boolean(touched.full_name && errors.full_name)}
                                                label={touched.full_name && errors.full_name ? errors.full_name : ''}
                                            />
                                        ) : (
                                            <Typography sx={{ width: '100%' }}>{values.full_name}</Typography>
                                        )}
                                    </Stack>
                                </Grid>
                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}
                                <Grid container mt={3} justifyContent="center">
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="small"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            {true ? 'Sửa thông tin' : 'Xác thực thông tin'}
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
                <CustomDialog
                    title="Đổi mật khẩu"
                    width="xs"
                    bodyComponent={<ChangePassword close={() => setOpenDialog(false)} />}
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                />
            </MainCard>
        );
    }

    return (
        <MainCard
            title="Quản lý hồ sơ"
            secondary={
                !user?.is_valid ? (
                    <>
                        <Chip label="Chưa xác thực" color="error" sx={{ borderRadius: '15px', fontSize: '12px', marginRight: '10px' }} />
                        <Button onClick={() => setOpenDialog(true)}>Đổi mật khẩu</Button>
                    </>
                ) : (
                    <>
                        <Chip label="Đã xác thực" color="success" sx={{ borderRadius: '15px', fontSize: '12px', marginRight: '10px' }} />
                        <Button onClick={() => setOpenDialog(true)}>Đổi mật khẩu</Button>
                    </>
                )
            }
        >
            <Formik
                enableReinitialize={true}
                initialValues={{
                    email: user.email,
                    full_name: user.full_name || '',
                    mssv: user.mssv || '',
                    major: user.major || 14,
                    gender: user.gender || 1,
                    batch: user.batch || 64,
                    phonenumber: user.phonenumber || '',
                    birth: user.birth || '2012-12-27',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    full_name: Yup.string().max(255, 'Tên quá dài').required('Bắt buộc'),
                    mssv: Yup.string().length(8, 'Bắt buộc 8 ký tự').required('Bắt buộc'),
                    batch: Yup.string().required('Bắt buộc'),
                    phonenumber: Yup.string()
                        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
                        .required('Bắt buộc'),
                    gender: Yup.string().required('Bắt buộc'),
                    major: Yup.string().required('Bắt buộc'),
                    birth: Yup.string().required('Bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);

                        const new_values = values;
                        delete new_values.email;
                        await axiosInstance.put('profile/change', new_values).then((res) => {
                            setUser(res.data.data);

                            dispatch(
                                openSnackBar({
                                    message: res.data.message,
                                    status: 'success'
                                })
                            );
                        });
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                    console.log(values);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} px={30} pt={2}>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="email-login" sx={{ width: '150px' }}>
                                        Email
                                    </InputLabel>
                                    <Typography sx={{ width: '100%' }}>{values.email}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="full_name" sx={{ width: '150px' }}>
                                        Họ và tên
                                    </InputLabel>
                                    {!user?.is_valid ? (
                                        <TextField
                                            id="full_name"
                                            type="text"
                                            value={values.full_name}
                                            name="full_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập họ và tên"
                                            fullWidth
                                            error={Boolean(touched.full_name && errors.full_name)}
                                            label={touched.full_name && errors.full_name ? errors.full_name : ''}
                                        />
                                    ) : (
                                        <Typography sx={{ width: '100%' }}>{values.full_name}</Typography>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="mssv" sx={{ width: '150px' }}>
                                        Mã số sinh viên
                                    </InputLabel>
                                    {!user?.is_valid ? (
                                        <TextField
                                            id="mssv"
                                            type="text"
                                            value={values.mssv}
                                            name="mssv"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập mã số sinh viên"
                                            fullWidth
                                            error={Boolean(touched.mssv && errors.mssv)}
                                            label={touched.mssv && errors.mssv ? errors.mssv : ''}
                                        />
                                    ) : (
                                        <Typography sx={{ width: '100%' }}>{values.mssv}</Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="batch" sx={{ width: '150px' }}>
                                        Khóa học
                                    </InputLabel>
                                    {!user?.is_valid ? (
                                        <TextField
                                            id="batch"
                                            select
                                            value={values.batch}
                                            name="batch"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            error={Boolean(touched.batch && errors.batch)}
                                            label={touched.batch && errors.batch ? errors.batch : ''}
                                        >
                                            {batchs.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    ) : (
                                        <Typography sx={{ width: '100%' }}>K{values.batch}</Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="phonenumber" sx={{ width: '150px' }}>
                                        Số điện thoại
                                    </InputLabel>
                                    <TextField
                                        id="phonenumber"
                                        type="text"
                                        value={values.phonenumber}
                                        name="phonenumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Nhập số điện thoại"
                                        fullWidth
                                        error={Boolean(touched.phonenumber && errors.phonenumber)}
                                        label={touched.phonenumber && errors.phonenumber ? errors.phonenumber : ''}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="gender" sx={{ width: '150px' }}>
                                        Giới tính
                                    </InputLabel>
                                    <TextField
                                        id="gender"
                                        select
                                        value={values.gender}
                                        name="gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.gender && errors.gender)}
                                        label={touched.gender && errors.gender ? errors.gender : ''}
                                    >
                                        {genders.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="major" sx={{ width: '150px' }}>
                                        Ngành học
                                    </InputLabel>
                                    <TextField
                                        id="major"
                                        select
                                        value={values.major}
                                        name="major"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.major && errors.major)}
                                        label={touched.major && errors.major ? errors.major : ''}
                                    >
                                        {majors.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="major" sx={{ width: '150px' }}>
                                        Ngày sinh
                                    </InputLabel>
                                    <DatePicker value={values.birth} onChange={handleChange} />
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid container mt={3} justifyContent="center">
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {true ? 'Sửa thông tin' : 'Xác thực thông tin'}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <CustomDialog
                title="Đổi mật khẩu"
                width="xs"
                bodyComponent={<ChangePassword close={() => setOpenDialog(false)} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </MainCard>
    );
};

export default AccountProfile;
