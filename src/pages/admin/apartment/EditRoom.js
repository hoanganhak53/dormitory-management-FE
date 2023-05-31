import React, { useState } from 'react';
import { Button, FormLabel, Grid, MenuItem, TextField } from '@mui/material/index';

const EditRoom = ({ room }) => {
    const [type, setType] = useState('');
    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Số phòng</FormLabel>
                    <TextField
                        type="text"
                        defaultValue="211"
                        placeholder="Số phòng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={5.5}>
                    <FormLabel>Tòa nhà</FormLabel>
                    <TextField select value="" fullWidth sx={{ marginTop: '10px', marginBottom: '20px' }}>
                        <MenuItem value={1}>B1</MenuItem>
                        <MenuItem value={2}>B2</MenuItem>
                        <MenuItem value={3}>B3</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={5.5}>
                    <FormLabel>Kiểu phòng</FormLabel>
                    <TextField
                        select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        <MenuItem value={1}>Phòng 8 nữ full</MenuItem>
                        <MenuItem value={2}>Phòng 4 nữ full</MenuItem>
                        <MenuItem value={3}>Phòng 10 nam B3</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            {type !== '' && (
                <Grid container justifyContent="space-between">
                    <Grid item xs={12}>
                        <FormLabel>Giới tính</FormLabel>
                        <TextField select value="" fullWidth sx={{ marginTop: '10px', marginBottom: '20px' }}>
                            <MenuItem value={1}>Nam</MenuItem>
                            <MenuItem value={2}>Nữ</MenuItem>
                        </TextField>
                    </Grid>
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
            )}

            <Grid container justifyContent="end">
                <Button>Sửa</Button>
            </Grid>
        </Grid>
    );
};

export default EditRoom;
