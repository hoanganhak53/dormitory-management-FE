import { useState } from 'react';

// material-ui
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from 'react-redux';
import { openSnackBar } from 'store/reducers/menu';

const AuthRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowRepassword = () => {
        setShowRepassword(!showRepassword);
    };

    const handleMouseDownRepassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    full_name: '',
                    email: '',
                    mssv: '',
                    password: '',
                    repassword: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    full_name: Yup.string().max(255, 'Tên quá dài').required('Họ và tên là bắt buộc'),
                    email: Yup.string().email('Email không đúng định dạng').max(255).required('Email là trường bắt buộc'),
                    mssv: Yup.string().required('Mã số sinh viên là trường bắt buộc'),
                    password: Yup.string()
                        .max(20, 'Mật khẩu tối đa 20 ký tự')
                        .required('Mật khẩu là trường bắt buộc')
                        .min(6, 'Mật khẩu dài ít nhất 6 ký tự'),
                    repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);

                        await axiosInstance
                            .post('auth/register', {
                                email: values.email,
                                mssv: values.mssv,
                                full_name: values.full_name,
                                password: values.password
                            })
                            .then((res) => {
                                dispatch(
                                    openSnackBar({
                                        message: res.data.message,
                                        status: 'success'
                                    })
                                );
                            });
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: 'Tài khoản email đã tồn tại' });
                        setSubmitting(false);
                        dispatch(
                            openSnackBar({
                                message: res.data.message,
                                status: 'success'
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
                                    <InputLabel htmlFor="full_name-signup">Họ và tên*</InputLabel>
                                    <OutlinedInput
                                        id="full_name-login"
                                        type="full_name"
                                        value={values.full_name}
                                        name="full_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Hoàng Anh"
                                        fullWidth
                                        error={Boolean(touched.full_name && errors.full_name)}
                                    />
                                    {touched.full_name && errors.full_name && (
                                        <FormHelperText error id="helper-text-full_name-signup">
                                            {errors.full_name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
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
                                        placeholder="anh.ndh22xxx@sis.hust.edu.vn"
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
                                        placeholder="20190000"
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
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="repassword-signup">Nhập lại mật khẩu</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.repassword && errors.repassword)}
                                        id="repassword-signup"
                                        type={showRepassword ? 'text' : 'password'}
                                        value={values.repassword}
                                        name="repassword"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle repassword visibility"
                                                    onClick={handleClickShowRepassword}
                                                    onMouseDown={handleMouseDownRepassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showRepassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.repassword && errors.repassword && (
                                        <FormHelperText error id="helper-text-repassword-signup">
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
                                        Tạo tài khoản
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

export default AuthRegister;
