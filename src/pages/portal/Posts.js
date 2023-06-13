import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '../../../node_modules/@mui/material/index';
import CardPost from './CardPost';
import { axiosInstance } from 'utils/auth-header';

export const Posts = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get(`post/list/1`).then(async (res) => {
                    setPostList(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, []);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid container sx={{ mt: 10, mb: 8 }} justifyContent="center">
                <Typography variant="h1" color="secondary.600">
                    THÔNG BÁO
                </Typography>
            </Grid>
            <Grid container rowSpacing={4.5} columnSpacing={2.75} justifyContent="center" mb={7}>
                {postList.slice(0, 3).map((e) => (
                    <Grid item xs={12} md={6} lg={3} justifyContent="center">
                        <CardPost post={e} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Posts;
