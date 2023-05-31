import React, { useState } from 'react';
import { FormLabel, Grid, TextField, Button, MenuItem } from '@mui/material/index';
import DatePicker from 'components/DatePicker';

const CreateRegistration = () => {
    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Tên đợt đăng ký</FormLabel>
                    <TextField
                        id="describe"
                        type="text"
                        name="describe"
                        placeholder="Tên đợt đăng ký"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Kỳ mở đăng ký</FormLabel>
                    <TextField id="semester" value="" select name="semester" fullWidth>
                        <MenuItem value={1}>20222</MenuItem>
                        <MenuItem value={2}>20223</MenuItem>
                        <MenuItem value={3}>20221</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian bắt đầu</FormLabel>
                    <DatePicker />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian kết thúc</FormLabel>
                    <DatePicker />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian mở đăng ký</FormLabel>
                    <DatePicker />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Thời gian đóng đăng ký</FormLabel>
                    <DatePicker />
                </Grid>
                <Grid item xs={3.6}>
                    <FormLabel>Hạn nộp lệ phí</FormLabel>
                    <DatePicker />
                </Grid>
                <Grid item xs={3.6}></Grid>
            </Grid>
            <Grid container justifyContent="end">
                <Button>Tạo</Button>
            </Grid>
        </Grid>
    );
};

export default CreateRegistration;
