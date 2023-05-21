import React, { useState } from 'react';

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

const AccountProfile = () => {
    return (
        <MainCard
            title="Quản lý hồ sơ"
            secondary={true ? <Chip label="Chưa xác thực" color="error" /> : <Chip label="Đã xác thực" color="success" />}
        >
            <Formik
                initialValues={{
                    email: 'hopan@gmail.com',
                    full_name: 'Hoang Anh',
                    mssv: '20193980',
                    major: 14,
                    gender: 'male',
                    batch: 67,
                    phonenumber: '0912975138',
                    birth: '2023-12-12',
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
                    major: Yup.string().required('Bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
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
                        <Grid container spacing={3} alignItems="center" px={30} pt={2}>
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

                            <Grid item xs={12}>
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <InputLabel htmlFor="mssv" sx={{ width: '150px' }}>
                                        Mã số sinh viên
                                    </InputLabel>
                                    {true ? (
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
                                    {true ? (
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
        </MainCard>
    );
};

export default AccountProfile;
