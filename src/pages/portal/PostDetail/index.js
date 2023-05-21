import React from 'react';
import Footer from '../Footer';
import { PostHeader } from './PostHeader';
import { Grid } from '@mui/material/index';
import { PostContent } from './PostContent';
import { PostSidebar } from './PostSidebar';

const PostDetail = () => {
    return (
        <>
            <PostHeader />
            <Grid container justifyContent="center" py={5} sx={{ backgroundColor: '#fff' }}>
                <Grid item sx={12} md={5} lg={5}>
                    <PostContent />
                </Grid>
                <Grid item sx={12} md={3} lg={3}>
                    <PostSidebar />
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default PostDetail;
