import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const CardPost = ({ post = {} }) => {
    const navigator = useNavigate();

    function stripHtml(html) {
        return html.replace(/<[^>]+>/g, '');
    }

    return (
        <MainCard np={true} contentSX={{ p: '0px' }} sx={{ height: '500px' }}>
            <CardActionArea>
                <CardMedia component="img" height="230" image={post.image} alt="post_img" />
                <CardContent sx={{ pb: '0px' }}>
                    <Typography gutterBottom variant="h4" component="div">
                        {post.title}
                    </Typography>
                    <div style={{ overflow: 'hidden', maxHeight: '8rem' }}>
                        <Typography variant="h6" color="text.secondary" sx={{ textOverflow: 'ellipsis' }}>
                            {stripHtml(post.content)}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => navigator(`/portal/post/${post.id}`)}>
                    Xem thêm
                </Button>
            </CardActions>
        </MainCard>
    );
};

export default CardPost;
