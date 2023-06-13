import { Grid, Typography } from '@mui/material/index';
import { FieldTimeOutlined } from '@ant-design/icons';
import { formatTime } from 'utils/fomat';

export const PostHeader = ({ post }) => {
    return (
        <Grid container justifyContent="center" py={5}>
            <Grid item xs={12} md={8} lg={8}>
                <Typography variant="h2" sx={{ textTransform: 'uppercase' }}>
                    {post?.title}
                </Typography>
                <Typography variant="h6" color="secondary.main">
                    <FieldTimeOutlined />
                    &ensp;{formatTime(post?.created_at)}
                </Typography>
            </Grid>
        </Grid>
    );
};
