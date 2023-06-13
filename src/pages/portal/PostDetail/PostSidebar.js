import { Grid, Typography } from '@mui/material/index';
import { styled } from '@mui/material/styles';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';

const TitlePostTypography = styled(Typography)`
    &:hover {
        color: #1890ff;
        cursor: pointer;
    }
`;

export const PostSidebar = ({ posts = [] }) => {
    const navigate = useNavigate();
    return (
        <Grid container pl={8}>
            <Grid item mb={2}>
                <Typography variant="h3" sx={{ borderBottom: '3px solid #1890ff' }}>
                    Bài viết mới
                </Typography>
            </Grid>
            {posts.slice(0, 6).map((e) => (
                <Grid item mb={3} key={e.id}>
                    <TitlePostTypography
                        onClick={() => {
                            navigate(`/portal/post/${e.id}`);
                            window.location.reload();
                        }}
                        variant="h5"
                    >
                        {e.title}
                    </TitlePostTypography>
                </Grid>
            ))}
        </Grid>
    );
};
