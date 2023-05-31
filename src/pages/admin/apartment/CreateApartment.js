import React from 'react';
import { Button, FormLabel, Grid, TextField } from '@mui/material/index';

const CreateApartment = ({ room }) => {
    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Tên tòa nhà</FormLabel>
                    <TextField
                        type="text"
                        defaultValue=""
                        placeholder="Tên tòa nhà"
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

export default CreateApartment;
