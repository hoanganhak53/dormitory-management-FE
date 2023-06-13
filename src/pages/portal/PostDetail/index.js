import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import { PostHeader } from './PostHeader';
import { Grid } from '@mui/material/index';
import { PostContent } from './PostContent';
import { PostSidebar } from './PostSidebar';
import { useParams } from 'react-router-dom/dist/index';
import { axiosInstance } from 'utils/auth-header';

const PostDetail = () => {
    const param = useParams();
    const [post, setPost] = useState({});
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get(`post/detail/${param.id}`).then(async (res) => {
                    setPost(res.data.data);
                });

                await axiosInstance.get(`post/list/1`).then(async (res) => {
                    setPostList(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, []);
    return (
        <>
            <PostHeader post={post} />
            <Grid container justifyContent="center" py={5} sx={{ backgroundColor: '#fff' }}>
                <Grid item xs={12} md={5} lg={5}>
                    <PostContent post={post} />
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <PostSidebar posts={postList} />
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default PostDetail;
