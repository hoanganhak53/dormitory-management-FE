import React from 'react';
import { Button, FormLabel, Grid, MenuItem, TextField } from '@mui/material/index';

const RoomEdit = ({ room }) => {
    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Tên loại phòng</FormLabel>
                    <TextField
                        type="text"
                        defaultValue="Phòng 4 nữ full"
                        placeholder="Tên loại phòng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Giới tính</FormLabel>
                    <TextField select fullWidth value="" sx={{ marginTop: '10px', marginBottom: '20px' }}>
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
                        defaultValue="400000"
                        placeholder="Giá phòng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={5.5}>
                    <FormLabel>Số người</FormLabel>
                    <TextField
                        type="text"
                        defaultValue="8"
                        placeholder="Số người tối đa"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button>Tạo</Button>
            </Grid>
        </Grid>
    );
};

export default RoomEdit;
