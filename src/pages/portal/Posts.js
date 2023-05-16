import React from 'react';
import { Grid, Typography } from '../../../node_modules/@mui/material/index';
import CardPost from './CardPost';

export const Posts = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid container xs={12} sx={{ mt: 10, mb: 8 }} justifyContent="center">
                <Typography variant="h1" color="secondary.600">
                    THÔNG BÁO
                </Typography>
            </Grid>
            <Grid container xs={12} rowSpacing={4.5} columnSpacing={2.75} justifyContent="center" mb={7}>
                <Grid item xs={12} md={6} lg={3} justifyContent="center">
                    <CardPost />
                </Grid>
                <Grid item xs={12} md={6} lg={3} justifyContent="center">
                    <CardPost />
                </Grid>
                <Grid item xs={12} md={6} lg={3} justifyContent="center">
                    <CardPost />
                </Grid>
            </Grid>
            <Grid container xs={12} rowSpacing={4.5} columnSpacing={2.75} justifyContent="center" mb={7}>
                <Grid item xs={12} md={6} lg={3} justifyContent="center">
                    <CardPost />
                </Grid>
                <Grid item xs={12} md={6} lg={3} justifyContent="center">
                    <CardPost />
                </Grid>
                <Grid item xs={12} md={6} lg={3} justifyContent="center">
                    <CardPost />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Posts;
