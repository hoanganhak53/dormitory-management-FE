import React from 'react';
import { Chip, Grid, Typography } from '@mui/material/index';
import MainCard from 'components/MainCard';
import { styled } from '@mui/material/styles';
import { Checkbox } from '../../../../node_modules/@mui/material/index';
import { formatCurrency, formatGender } from 'utils/fomat';

// loader style
const Card = styled(Grid)`
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

const RoomCard = ({ room, viewDetail, selectRoom, filter }) => {
    const label = room?.student_num == room?.room_type?.capacity ? 'Đã đầy' : 'Còn trống';
    const color = room?.student_num == room?.room_type?.capacity ? 'error' : 'success';

    return (
        <Grid item xs={3}>
            <Card container direction="column">
                <MainCard>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid container item direction="row" xs={9} alignItems="center">
                            <Typography variant="h5" onClick={() => viewDetail(1, room)}>
                                Phòng {room?.room_name}{' '}
                            </Typography>
                            <Chip
                                label={label}
                                color={color}
                                sx={{
                                    width: 'fit-content',
                                    borderRadius: '15px',
                                    fontSize: '12px',
                                    padding: '3px 0px',
                                    height: 'auto',
                                    marginLeft: '8px'
                                }}
                            ></Chip>
                        </Grid>
                        {filter != 0 && room?.student_num != room?.room_type?.capacity && room?.student_num != 0 && (
                            <Checkbox onClick={() => selectRoom(room)} />
                        )}
                    </Grid>
                    <Grid onClick={() => viewDetail(1, room)}>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Loại phòng: </Typography>
                            <Typography>{room?.room_type?.room_type_name}</Typography>
                        </Grid>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Số lượng:</Typography>
                            <Typography>
                                {room?.student_num}/{room?.room_type?.capacity} người
                            </Typography>
                        </Grid>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Giá: </Typography>
                            <Typography>{formatCurrency(room?.room_type?.room_price)}</Typography>
                        </Grid>
                        <Grid container item direction="row" mb={1}>
                            <Typography sx={{ fontWeight: '600', display: 'inline', paddingRight: '10px' }}>Giới tính: </Typography>
                            <Typography>{formatGender(room?.room_type?.gender)}</Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            </Card>
        </Grid>
    );
};

export default RoomCard;
