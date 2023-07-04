import React, { useState } from 'react';
import { Button, FormLabel, Grid, MenuItem, TextField } from '@mui/material/index';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';
import { axiosInstance } from 'utils/auth-header';

const RoomEdit = ({ close }) => {
    const [room_type, setRoomType] = useState({ room_type_name: '', gender: 1, capacity: 4, room_price: '' });
    const dispatch = useDispatch();

    const submit = async () => {
        if (room_type.room_type_name == '' || !room_type.room_price || !room_type.capacity) {
            dispatch(
                openSnackBar({
                    message: 'Hãy điền đầy đủ thông tin',
                    status: 'error'
                })
            );
            return;
        }

        try {
            await axiosInstance.post('room_type', room_type).then(async (res) => {
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
                    <FormLabel>Tên loại phòng</FormLabel>
                    <TextField
                        type="text"
                        value={room_type.room_type_name}
                        onChange={(e) =>
                            setRoomType((prev) => {
                                const rs = { ...prev };
                                rs.room_type_name = e.target.value;
                                return rs;
                            })
                        }
                        placeholder="Tên loại phòng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Giới tính</FormLabel>
                    <TextField
                        select
                        fullWidth
                        value={room_type?.gender}
                        onChange={(e) =>
                            setRoomType((prev) => {
                                const rs = { ...prev };
                                rs.gender = e.target.value;
                                return rs;
                            })
                        }
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        <MenuItem value={1}>Nam</MenuItem>
                        <MenuItem value={2}>Nữ</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={5.5}>
                    <FormLabel>Giá phòng</FormLabel>
                    <TextField
                        type="text"
                        value={room_type?.room_price}
                        onChange={(e) =>
                            setRoomType((prev) => {
                                const rs = { ...prev };
                                rs.room_price = e.target.value;
                                return rs;
                            })
                        }
                        placeholder="Giá phòng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={5.5}>
                    <FormLabel>Số người</FormLabel>
                    <TextField
                        type="text"
                        value={room_type?.capacity}
                        onChange={(e) =>
                            setRoomType((prev) => {
                                const rs = { ...prev };
                                rs.capacity = e.target.value;
                                return rs;
                            })
                        }
                        placeholder="Số người tối đa"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submit}>Tạo</Button>
            </Grid>
        </Grid>
    );
};

export default RoomEdit;
