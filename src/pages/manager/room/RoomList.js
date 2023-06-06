import React, { useEffect } from 'react';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material/index';
import RoomCard from './RoomCard';
import RoomDetail from './RoomDeail';

const generateData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            id: i,
            room_number: `20${i}`,
            room_type_name: `Phòng 8 nữ full`,
            room_price: `600,000VND`,
            capacity: `8`,
            gender: `Nữ`,
            total: `3`
        });
    }
    return data;
};

const RoomList = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [room, setRoom] = React.useState({});
    const [selected, setSelected] = React.useState([]);
    const [data, setData] = React.useState(generateData(9));

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

    if (page) {
        return <RoomDetail viewDetail={viewDetail}></RoomDetail>;
    }

    return (
        <Grid>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item>
                    <Typography variant="h5">Danh sách phòng - B3</Typography>
                </Grid>
                <Grid item>
                    <TextField select value={value} sx={{ width: '140px' }} onChange={(e) => setValue(e.target.value)}>
                        <MenuItem value={0}>Tất cả</MenuItem>
                        <MenuItem value="Phòng 8 nữ full">Phòng 8 nữ full</MenuItem>
                        <MenuItem value="Phòng 4 nữ full">Phòng 4 nữ full</MenuItem>
                        <MenuItem value="Phòng 10 nam B3">Phòng 10 nam B3</MenuItem>
                    </TextField>
                    {value !== 0 && (
                        <>
                            <Button onClick={() => console.log(selected)}>Dồn phòng</Button>
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {data
                    .filter((e) => {
                        if (value == 0) {
                            return true;
                        } else {
                            return e.room_type_name == value;
                        }
                    })
                    .map((e) => (
                        <RoomCard key={e.id} viewDetail={viewDetail} room={e} selectRoom={selectRoom} />
                    ))}
            </Grid>
        </Grid>
    );
};

export default RoomList;
