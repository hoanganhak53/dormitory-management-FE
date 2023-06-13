import { Grid } from '@mui/material/index';
import parse from 'html-react-parser';

export const PostContent = ({ post }) => {
    const html = parse(post?.content || '');

    return (
        <Grid container>
            <Grid item mb={2}>
                <img style={{ width: '100%' }} src={post?.image} alt="post-img" />
            </Grid>
            <Grid item mb={2}>
                {html}
            </Grid>
        </Grid>
    );
};
