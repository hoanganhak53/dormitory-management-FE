import React, { useState } from 'react';
import { FormLabel, Grid, TextField, Button, MenuItem } from '@mui/material/index';
import DatePicker from 'components/DatePicker';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';
import { axiosInstance } from 'utils/auth-header';

const CreateRegistration = ({ registration_old = {}, close }) => {
    const [registration, setRegistration] = useState(registration_old.id ? registration_old : { registration_name: '', semester: '20222' });
    const dispatch = useDispatch();

    const submit = async () => {
        try {
            if (registration.id != null) {
                await axiosInstance.put('registration', registration).then(async (res) => {
                    dispatch(
                        openSnackBar({
                            message: res.data.message,
                            status: 'success'
                        })
                    );
                });
            } else {
                await axiosInstance.post('registration', registration).then(async (res) => {
                    dispatch(
                        openSnackBar({
                            message: res.data.message,
                            status: 'success'
                        })
                    );
                });
            }
            close();
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: err?.response?.data?.detail,
                    status: 'error'
                })
            );
        }
    };

    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Tên đợt đăng ký</FormLabel>
                    <TextField
                        id="describe"
                        type="text"
                        value={registration.registration_name}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.registration_name = e.target.value;
                                return rs;
                            })
                        }
                        placeholder="Tên đợt đăng ký"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Kỳ mở đăng ký</FormLabel>
                    <TextField
                        id="semester"
                        value={registration.semester}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.semester = e.target.value;
                                return rs;
                            })
                        }
                        select
                        name="semester"
                        fullWidth
                    >
                        <MenuItem value="20232">20232</MenuItem>
                        <MenuItem value="20231">20231</MenuItem>
                        <MenuItem value="20223">20223</MenuItem>
                        <MenuItem value="20222">20222</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian bắt đầu</FormLabel>
                    <DatePicker
                        value={registration.start_date}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.start_date = e.target.value;
                                return rs;
                            })
                        }
                        type="datetime-local"
                    />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian kết thúc</FormLabel>
                    <DatePicker
                        value={registration.end_date}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.end_date = e.target.value;
                                return rs;
                            })
                        }
                        type="datetime-local"
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian mở đăng ký</FormLabel>
                    <DatePicker
                        value={registration.start_register}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.start_register = e.target.value;
                                return rs;
                            })
                        }
                        type="datetime-local"
                    />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian đóng đăng ký</FormLabel>
                    <DatePicker
                        value={registration.end_register}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.end_register = e.target.value;
                                return rs;
                            })
                        }
                        type="datetime-local"
                    />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Hạn nộp lệ phí</FormLabel>
                    <DatePicker
                        value={registration.paid_date}
                        onChange={(e) =>
                            setRegistration((prev) => {
                                const rs = { ...prev };
                                rs.paid_date = e.target.value;
                                return rs;
                            })
                        }
                        type="datetime-local"
                    />
                </Grid>
                <Grid item xs={3.6}></Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submit}>{registration_old.id ? 'Sửa' : 'Tạo'}</Button>
            </Grid>
        </Grid>
    );
};

export default CreateRegistration;
