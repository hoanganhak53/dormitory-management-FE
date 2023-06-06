import React from 'react';
import { Chip, Grid, Typography } from '@mui/material/index';
import MainCard from 'components/MainCard';
import { styled } from '@mui/material/styles';
import { Checkbox } from '../../../../node_modules/@mui/material/index';

// loader style
const Card = styled(Grid)`
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

const RoomCard = ({ room, viewDetail, selectRoom }) => {
    return (
        <Grid item xs={3}>
            <Card container direction="column">
                <MainCard>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid container item direction="row" xs={9} alignItems="center">
                            <Typography variant="h5" onClick={() => viewDetail(room)}>
                                Phòng 211{' '}
                            </Typography>
                            <Chip
                                label="còn trống"
                                sx={{
                                    width: 'fit-content',
                                    borderRadius: '15px',
                                    fontSize: '12px',
                                    padding: '3px 0px',
                                    height: 'auto',
                                    marginLeft: '3px'
                                }}
                            ></Chip>
                        </Grid>
                        <Checkbox onClick={() => selectRoom(room)} />
                    </Grid>
                    <Grid onClick={() => viewDetail(1, room)}>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Loại phòng: </Typography>
                            <Typography>4 Nữ - full</Typography>
                        </Grid>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Số lượng:</Typography>
                            <Typography>3/7 người</Typography>
                        </Grid>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Giá: </Typography>
                            <Typography>600.000VND</Typography>
                        </Grid>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Giới tính: </Typography>
                            <Typography>Nữ</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Card>
        </Grid>
    );
};

export default RoomCard;
