import { useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from 'react-redux';
import { openSnackBar } from 'store/reducers/menu';
import emailjs from '@emailjs/browser';

const AuthForgotPassword = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    mssv: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Email không đúng định dạng').max(255).required('Email là trường bắt buộc'),
                    mssv: Yup.string().required('Mã số sinh viên là trường bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);

                        await axiosInstance
                            .post('auth/reset_password', {
                                email: values.email,
                                mssv: values.mssv
                            })
                            .then((res) => {
                                dispatch(
                                    openSnackBar({
                                        message: res.data.message,
                                        status: 'success'
                                    })
                                );
                                emailjs.send(
                                    'service_iff86u8',
                                    'template_191dgr5',
                                    {
                                        password: res.data.new_password,
                                        user_email: values.email
                                    },
                                    '_vKOEWbKlu7mvZPiO'
                                );
                            });
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: 'Không gửi được email, hãy thử lại sau' });
                        setSubmitting(false);
                        dispatch(
                            openSnackBar({
                                message: res.data.message,
                                status: 'error'
                            })
                        );
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="abc.xyz220000@sis.hust.edu.vn"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="mssv-signup">Mã số sinh viên*</InputLabel>
                                    <OutlinedInput
                                        id="mssv-login"
                                        type="text"
                                        value={values.mssv}
                                        name="mssv"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="20220000"
                                        fullWidth
                                        error={Boolean(touched.mssv && errors.mssv)}
                                    />
                                    {touched.mssv && errors.mssv && (
                                        <FormHelperText error id="helper-text-mssv-signup">
                                            {errors.mssv}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Lấy lại mật khẩu
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthForgotPassword;
