import React, { useState } from 'react';
import { Button, FormHelperText, Grid, Link, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { openSnackBar } from 'store/reducers/menu';
import { axiosInstance } from 'utils/auth-header';

const ChangePassword = ({ close }) => {
    const dispatch = useDispatch();

    return (
        <Grid container>
            <Formik
                initialValues={{
                    old_password: '',
                    password: '',
                    repassword: ''
                }}
                validationSchema={Yup.object().shape({
                    old_password: Yup.string()
                        .max(20, 'Mật khẩu tối đa 20 ký tự')
                        .required('Mật khẩu là trường bắt buộc')
                        .min(6, 'Mật khẩu dài ít nhất 6 ký tự'),
                    password: Yup.string()
                        .max(20, 'Mật khẩu tối đa 20 ký tự')
                        .required('Mật khẩu là trường bắt buộc')
                        .min(6, 'Mật khẩu dài ít nhất 6 ký tự'),
                    repassword: Yup.string('').oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);

                        const new_values = values;
                        delete new_values.repassword;
                        await axiosInstance.put('profile/change/password', new_values).then((res) => {
                            close();
                            dispatch(
                                openSnackBar({
                                    message: res.data?.message,
                                    status: 'success'
                                })
                            );
                        });
                    } catch (err) {
                        console.log(err);
                        setStatus({ success: false });
                        setErrors({ submit: err?.response?.data?.detail });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Mật khẩu cũ</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.old_password && errors.old_password)}
                                        id="-old_password-login"
                                        type="password"
                                        value={values.old_password}
                                        name="old_password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                    />
                                    {touched.old_password && errors.old_password && (
                                        <FormHelperText error id="standard-weight-helper-text-old_password-login">
                                            {errors.old_password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type="password"
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.repassword && errors.repassword)}
                                        id="-repassword-login"
                                        type="password"
                                        value={values.repassword}
                                        name="repassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                    />
                                    {touched.repassword && errors.repassword && (
                                        <FormHelperText error id="standard-weight-helper-text-repassword-login">
                                            {errors.repassword}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid container item xs={12} justifyContent="end">
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Đổi mật khẩu
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Grid>
    );
};

export default ChangePassword;
