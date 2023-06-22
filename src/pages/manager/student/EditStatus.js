import React, { useState } from 'react';
import { Button, FormLabel, Grid, MenuItem, TextField } from '@mui/material/index';
import { useDispatch } from 'react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';
import { axiosInstance } from 'utils/auth-header';

const EditStatus = ({ close, d_status = 0, registration = {} }) => {
    const [status, setStatus] = useState(d_status);
    const dispatch = useDispatch();

    const submit = async () => {
        if (d_status == 3) {
            dispatch(
                openSnackBar({
                    message: 'Không thể sửa trạng thái khai đã xếp phòng',
                    status: 'error'
                })
            );
            return;
        }
        try {
            await axiosInstance.put('student_room', { ...registration, status }).then(async (res) => {
                dispatch(
                    openSnackBar({
                        message: res.data.message,
                        status: 'success'
                    })
                );
            });
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
                    <FormLabel>Trạng thái</FormLabel>
                    <TextField
                        select
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        <MenuItem value={2}>Đã nộp tiền</MenuItem>
                        <MenuItem value={4}>Đã hủy</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submit}>Chỉnh sửa</Button>
            </Grid>
        </Grid>
    );
};

export default EditStatus;
