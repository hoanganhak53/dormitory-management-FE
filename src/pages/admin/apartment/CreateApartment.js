import React, { useEffect, useState } from 'react';
import { Button, FormLabel, Grid, TextField } from '@mui/material/index';
import { axiosInstance } from 'utils/auth-header';
import { MenuItem } from '../../../../node_modules/@mui/material/index';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const CreateApartment = ({ apartment = {}, close }) => {
    const [managers, setMangagers] = useState([]);
    const [apartment_name, setApartmentName] = useState(apartment.apartment_name || '');
    const [target, setTarget] = useState(managers.find((e) => e.id === apartment.manager_id) || { full_name: '', id: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        let unsub = false;

        const init = async () => {
            try {
                await axiosInstance.get('user_type/2').then((res) => {
                    setMangagers(res.data.data);
                    setTarget(res.data.data.find((e) => e.id === apartment.manager_id) || { full_name: '', id: '' });
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, []);

    const submit = async () => {
        const data = { ...apartment };
        data.apartment_name = apartment_name;
        data.manager_id = target.id;

        if (!data.apartment_name || !data.manager_id) {
            dispatch(
                openSnackBar({
                    message: 'Hãy điền đầy đủ thông tin',
                    status: 'error'
                })
            );
            return;
        }

        try {
            if (data.id != null) {
                await axiosInstance.put('apartment', data).then(async (res) => {
                    dispatch(
                        openSnackBar({
                            message: res.data.message,
                            status: 'success'
                        })
                    );
                });
            } else {
                await axiosInstance.post('apartment', data).then(async (res) => {
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
                    <FormLabel>Tên tòa nhà</FormLabel>
                    <TextField
                        type="text"
                        value={apartment_name}
                        onChange={(e) => setApartmentName(e.target.value)}
                        placeholder="Tên tòa nhà"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>Chọn quản lý</FormLabel>
                    <TextField
                        id="manager"
                        value={target.id}
                        select
                        name="manager"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                        onChange={(e) => setTarget(managers.find((rt) => rt.id === e.target.value))}
                    >
                        {managers.map((e) => (
                            <MenuItem key={e.id} value={e.id}>
                                {e.full_name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submit}>{apartment.id ? 'Sửa' : 'Tạo'}</Button>
            </Grid>
        </Grid>
    );
};

export default CreateApartment;
