import React, { useState } from 'react';
import { Button, FormLabel, Grid, MenuItem, TextField } from '@mui/material/index';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const EditRoom = ({ room = {}, apartments, room_types, close }) => {
    const [room_type, setRoomType] = useState(
        room_types.find((e) => e.room_type_name === room.room_type_name) || { room_type_name: '', gender: '' }
    );
    const [apartment, setApartment] = useState(apartments.find((e) => e.apartment_name === room.apartment_name) || { apartment_name: '' });
    const [room_name, setRoomName] = useState(room.room_name || '');
    const dispatch = useDispatch();

    const submit = async () => {
        const data = { ...room };
        data.room_name = room_name;
        data.apartment_id = apartment.id;
        data.room_type_id = room_type.id;

        if (
            !data.room_name ||
            !data.room_type_id ||
            !data.apartment_id ||
            !room_type.gender ||
            !room_type.room_price ||
            !room_type.capacity
        ) {
            dispatch(
                openSnackBar({
                    message: 'Hãy điền đầy đủ thông tin',
                    status: 'error'
                })
            );
            return;
        }

        try {
            await axiosInstance.put('room_type', room_type).then(async (res) => {
                console.log(res.data);
            });

            if (data.id != null) {
                await axiosInstance.put('room', data).then(async (res) => {
                    dispatch(
                        openSnackBar({
                            message: res.data.message,
                            status: 'success'
                        })
                    );
                });
            } else {
                await axiosInstance.post('room', data).then(async (res) => {
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
                    <FormLabel>Số phòng</FormLabel>
                    <TextField
                        type="text"
                        value={room_name}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Số phòng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={5.5}>
                    <FormLabel>Tòa nhà</FormLabel>
                    <TextField
                        select
                        value={apartment.apartment_name}
                        onChange={(e) => setApartment(apartments.find((rt) => rt.apartment_name === e.target.value))}
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        {apartments.map((e) => (
                            <MenuItem key={e.id} value={e.apartment_name}>
                                {e.apartment_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={5.5}>
                    <FormLabel>Kiểu phòng</FormLabel>
                    <TextField
                        select
                        value={room_type.room_type_name}
                        onChange={(e) => setRoomType(room_types.find((rt) => rt.room_type_name === e.target.value))}
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        {room_types.map((e) => (
                            <MenuItem key={e.id} value={e.room_type_name}>
                                {e.room_type_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            {room_type.room_type_name != null && room_type.room_type_name != '' && (
                <Grid container justifyContent="space-between">
                    <Grid item xs={12}>
                        <FormLabel>Giới tính</FormLabel>
                        <TextField
                            select
                            value={room_type?.gender}
                            onChange={(e) =>
                                setRoomType((prev) => {
                                    const rs = { ...prev };
                                    rs.gender = e.target.value;
                                    return rs;
                                })
                            }
                            fullWidth
                            sx={{ marginTop: '10px', marginBottom: '20px' }}
                        >
                            <MenuItem value={1}>Nam</MenuItem>
                            <MenuItem value={2}>Nữ</MenuItem>
                        </TextField>
                    </Grid>
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
            )}

            <Grid container justifyContent="end">
                <Button onClick={submit}>{room.id ? 'Sửa' : 'Tạo'}</Button>
            </Grid>
        </Grid>
    );
};

export default EditRoom;
