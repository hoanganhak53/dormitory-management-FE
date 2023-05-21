import { Grid, Typography } from '@mui/material/index';
import { FieldTimeOutlined } from '@ant-design/icons';

export const PostHeader = () => {
    return (
        <Grid container justifyContent="center" py={5}>
            <Grid item sx={12} md={8} lg={8}>
                <Typography variant="h2" sx={{ textTransform: 'uppercase' }}>
                    Thông báo xếp ở nôi trú cho sinh viên K67 KỲ I NĂM HỌC 2022-2023
                </Typography>
                <Typography variant="h6" color="secondary.main">
                    <FieldTimeOutlined />
                    &ensp;18 Th5 2023
                </Typography>
            </Grid>
        </Grid>
    );
};
