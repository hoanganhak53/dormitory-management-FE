import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const CardPost = () => {
    const navigator = useNavigate();

    return (
        <MainCard np={true} contentSX={{ p: '0px' }} sx={{ height: '500px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="230"
                    image="https://khoinguonsangtao.vn/wp-content/uploads/2022/12/background-vintage-lich-su.jpg"
                    alt="post_img"
                />
                <CardContent sx={{ pb: '0px' }}>
                    <Typography gutterBottom variant="h4" component="div">
                        Lizard
                    </Typography>
                    <div style={{ overflow: 'hidden', maxHeight: '10rem' }}>
                        <Typography variant="h6" color="text.secondary" sx={{ textOverflow: 'ellipsis' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
                            except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                            all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over 6,000 species,
                            ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with over
                            6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate
                            reptiles, with over 6,000 species, ranging across all continents except Antarctica
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => navigator('post/1')}>
                    Xem thêm
                </Button>
            </CardActions>
        </MainCard>
    );
};

export default CardPost;
