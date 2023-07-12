import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material/index';
import RoomCard from './RoomCard';
import RoomDetail from './RoomDeail';
import { axiosInstance } from 'utils/auth-header';
import CustomDialog from 'components/CustomDialog';
import Distribute from './Distribute';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const RoomList = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const apartment_id = user.apartment_id;
    const [room_type_unique, setRoomTypeUnique] = useState([]);
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [room, setRoom] = React.useState({});
    const [selected, setSelected] = React.useState([]);
    const [apartment, setApartment] = React.useState({});
    const [rooms, setRooms] = React.useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [distributeValue, setDistributeValue] = React.useState([]);
    const [distributeStatistic, setDistributeStatistic] = React.useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setSelected([]);
        let unsub = false;

        const init = async () => {
            try {
                await axiosInstance.get(`apartment/${apartment_id}`).then((res) => {
                    setApartment(res.data.data);
                    setRooms(res.data.rooms);
                    setRoomTypeUnique([...new Set(res.data.rooms.map((item) => item.room_type.room_type_name))]);
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, [page]);

    const viewDetail = (page, roomDetail) => {
        setRoom(roomDetail);
        setPage(page);
    };

    const selectRoom = (roomDetail) => {
        if (selected.find((e) => e.id == roomDetail.id)) {
            setSelected((prev) => {
                const rs = prev.filter((r) => r.id != roomDetail.id);
                return rs;
            });
        } else {
            setSelected((prev) => {
                const rs = [...prev, roomDetail];
                return rs;
            });
        }
    };

    const distribute = async () => {
        setOpenDialog(true);
        try {
            await axiosInstance.post('room/distribute', selected).then(async (res) => {
                setDistributeValue(res.data.data);
                setDistributeStatistic(res.data.statistic);
                setOpenDialog(true);
            });
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: 'Dồn phòng bị lỗi, hãy thử lại sau',
                    status: 'error'
                })
            );
        }
    };

    if (page) {
        return <RoomDetail viewDetail={viewDetail} apartment={apartment} room={room}></RoomDetail>;
    }

    return (
        <Grid>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item>
                    <Typography variant="h5">Danh sách phòng - {apartment?.apartment_name}</Typography>
                </Grid>
                <Grid item>
                    {value !== 0 && (
                        <>
                            <Button onClick={distribute}>Dồn phòng</Button>
                        </>
                    )}
                    <TextField
                        select
                        value={value}
                        sx={{ width: '140px' }}
                        onChange={(e) => {
                            setValue(e.target.value);
                            setSelected([]);
                        }}
                    >
                        <MenuItem value={0}>Tất cả</MenuItem>
                        {room_type_unique.map((e) => (
                            <MenuItem value={e} key={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {rooms
                    .filter((e) => {
                        if (value == 0) {
                            return true;
                        } else {
                            return e?.room_type?.room_type_name == value;
                        }
                    })
                    .map((e) => (
                        <RoomCard key={e.id} viewDetail={viewDetail} room={e} selectRoom={selectRoom} filter={value} />
                    ))}
            </Grid>
            <CustomDialog
                title="Dồn phòng"
                width="sm"
                bodyComponent={<Distribute result={distributeValue} statistic={distributeStatistic} close={() => setOpenDialog(false)} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default RoomList;
