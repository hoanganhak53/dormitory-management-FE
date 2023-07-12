import React, { useState } from 'react';
import { Button, FormLabel, Grid, MenuItem, TextField } from '@mui/material/index';
import { openSnackBar } from 'store/reducers/menu';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from 'react-redux/es/exports';
import { Typography } from '../../../../../node_modules/@mui/material/index';
import { formatCurrency, formatTime } from 'utils/fomat';

const RegisterRoom = ({ close }) => {
    const [registration, setRegistration] = useState({});
    const [roomTypeList, setRoomTypeList] = useState([]);
    const [apartmentList, setApartmentList] = useState([]);
    const [result, setResult] = useState({
        registration_id: '',
        room_type_id: '',
        apartment_id: ''
    });
    const [target, setTarget] = useState({});

    const dispatch = useDispatch();

    React.useEffect(() => {
        let unsub = false;
        const init = async () => {
            try {
                await axiosInstance.get('registration/current').then(async (res) => {
                    setRegistration(res.data.registration);
                    setRoomTypeList(res.data.data);
                });

                await axiosInstance.get('apartment/list').then(async (res) => {
                    setApartmentList(res.data.data);
                });
            } catch (err) {
                dispatch(
                    openSnackBar({
                        message: err?.response?.data?.detail || 'Hãy điền đủ thông tin',
                        status: 'error'
                    })
                );
            }
        };
        init();

        return () => {
            unsub = true;
        };
    }, []);

    const submit = async () => {
        if (result.room_type_id == '' || result.apartment_id == '') {
            dispatch(
                openSnackBar({
                    message: 'Hãy điền đầy đủ thông tin',
                    status: 'error'
                })
            );
            return;
        }
        try {
            await axiosInstance.post('student_room', { ...result, registration_id: registration.id }).then(async (res) => {
                dispatch(
                    openSnackBar({
                        message: res.data.message,
                        status: 'success'
                    })
                );
                close();
            });
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: err?.response?.data?.detail || 'Hãy điền đủ thông tin',
                    status: 'error'
                })
            );
        }
    };

    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12} mb={2}>
                    <Typography variant="h5">{registration.registration_name}</Typography>
                    <Typography sx={{ fontSize: '11px', color: 'gray' }}>
                        Bắt đầu từ {formatTime(registration.start_register)} cho đến {formatTime(registration.end_register)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Toà nhà</FormLabel>
                    <TextField
                        select
                        fullWidth
                        value={result?.apartment_id}
                        onChange={(e) =>
                            setResult((prev) => {
                                const rs = { ...prev };
                                rs.apartment_id = e.target.value;
                                return rs;
                            })
                        }
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        {apartmentList.map((e) => (
                            <MenuItem value={e.id} key={e.id}>
                                {e.apartment_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Loại phòng</FormLabel>
                    <TextField
                        select
                        fullWidth
                        value={target}
                        onChange={(e) => {
                            setTarget(e.target.value);
                            setResult((prev) => {
                                const rs = { ...prev };
                                rs.room_type_id = e.target.value.id;
                                return rs;
                            });
                        }}
                        helperText={
                            result.room_type_id != '' ? `sức chứa ${target.capacity} người, giá ${formatCurrency(target.room_price)}` : ''
                        }
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        {roomTypeList.map((e) => (
                            <MenuItem value={e} key={e.id}>
                                {e.room_type_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submit}>Đăng ký</Button>
            </Grid>
        </Grid>
    );
};

export default RegisterRoom;
