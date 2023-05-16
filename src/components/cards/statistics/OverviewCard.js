import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

const OverviewCard = ({ color, title, count, des, bgColor }) => (
    <MainCard contentSX={{ p: 2 }} bgColor={bgColor}>
        <Stack spacing={0.5}>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h3" color="white">
                        {count}
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" color="white">
                {title}
            </Typography>
        </Stack>
        <Box sx={{}}>
            <Typography variant="caption" color="white">
                {des}
            </Typography>
        </Box>
    </MainCard>
);

OverviewCard.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    des: PropTypes.string,
    bgColor: PropTypes.string
};

OverviewCard.defaultProps = {
    color: 'primary',
    bgColor: '#fff'
};

export default OverviewCard;
