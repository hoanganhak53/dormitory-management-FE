import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button, MenuItem, Stack, TextField, Grid } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React, { useEffect } from 'react';
import { Menu, Typography } from '@mui/material/index';
import { formatCurrency, formatGender } from 'utils/fomat';
import EditRoom from './EditRoom';
import RoomType from './RoomType';
import CreateApartment from './CreateApartment';
import { axiosInstance } from 'utils/auth-header';

const Apartment = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogConent, setDialogContent] = React.useState({
        title: '',
        bodyComponent: <></>,
        width: 'sm'
    });

    const [apartments, setApartments] = React.useState([]);
    const [roomTypes, setRoomTypes] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [target, setTarget] = React.useState(apartments[0] || { apartment_name: '' });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        let unsub = false;

        const init = async () => {
            try {
                await axiosInstance.get('room_type/list').then((res) => {
                    setRoomTypes(res.data.data);
                });

                await axiosInstance.get('apartment/list').then(async (res) => {
                    setApartments(res.data.data);
                    if (target?.apartment_name == '' || target.apartment_name == undefined) {
                        setTarget(res.data.data[0]);
                    }
                });

                await axiosInstance.get(`room/list`).then((res) => {
                    setRooms(res.data.data);
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, [openDialog]);

    const columns = [
        { field: 'room_name', headerName: 'Số phòng', width: 100 },
        { field: 'apartment_name', headerName: 'Tên tòa nhà', width: 120 },
        {
            field: 'action',
            headerName: 'Số người',
            width: 120,
            renderCell: function (row) {
                return `${row.student_num}/${row.capacity}`;
            }
        },
        {
            field: 'action',
            headerName: 'Giá phòng',
            width: 120,
            renderCell: function (row) {
                return formatCurrency(row.room_price);
            }
        },
        {
            field: 'action',
            headerName: 'Giới tính',
            width: 100,
            renderCell: function (row) {
                return formatGender(row.gender);
            }
        },
        { field: 'room_type_name', headerName: 'Loại phòng', width: 120 },
        {
            field: 'action',
            headerName: '',
            width: 100,
            renderCell: (row) => {
                return (
                    <Button
                        onClick={() => {
                            setDialogContent({
                                title: 'Chỉnh sửa phòng',
                                bodyComponent: (
                                    <EditRoom
                                        apartments={apartments}
                                        room_types={roomTypes}
                                        room={row}
                                        close={() => setOpenDialog(false)}
                                    ></EditRoom>
                                ),
                                width: 'xs'
                            });
                            setOpenDialog(true);
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                );
            }
        }
    ];

    const countStudents = () => {
        let rs = 0;
        rooms.map((e) => {
            if (e.apartment_id == target.id) {
                rs += e.student_num;
            }
        });
        return rs;
    };

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item xs={3.5}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <TextField
                            id="apartment"
                            value={target.apartment_name}
                            select
                            name="apartment"
                            label="Toà nhà"
                            fullWidth
                            onChange={(e) => setTarget(apartments.find((rt) => rt?.apartment_name === e.target.value))}
                        >
                            {apartments.map((e) => (
                                <MenuItem key={e.id} value={e.apartment_name}>
                                    {e.apartment_name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Chip
                            label={`${rooms.filter((e) => e.apartment_id == target.id).length} phòng`}
                            sx={{ width: 'fit-content', borderRadius: '15px', fontSize: '14px' }}
                        ></Chip>
                        <Chip
                            label={`${countStudents()} sinh viên`}
                            sx={{ width: 'fit-content', borderRadius: '15px', fontSize: '14px' }}
                        ></Chip>
                    </Stack>
                </Grid>
                <Grid item>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Tùy chọn
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setDialogContent({
                                    title: 'Tạo kiểu phòng',
                                    bodyComponent: <RoomType close={() => setOpenDialog(false)}></RoomType>,
                                    width: 'xs'
                                });
                                setOpenDialog(true);
                                handleClose();
                            }}
                        >
                            Tạo kiểu phòng
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setDialogContent({
                                    title: 'Tạo phòng',
                                    bodyComponent: (
                                        <EditRoom
                                            apartments={apartments}
                                            room_types={roomTypes}
                                            close={() => setOpenDialog(false)}
                                        ></EditRoom>
                                    ),
                                    width: 'xs'
                                });
                                setOpenDialog(true);
                                handleClose();
                            }}
                        >
                            Tạo phòng
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setDialogContent({
                                    title: 'Tạo tòa nhà',
                                    bodyComponent: <CreateApartment close={() => setOpenDialog(false)}></CreateApartment>,
                                    width: 'xs'
                                });
                                setOpenDialog(true);
                                handleClose();
                            }}
                        >
                            Tạo tòa nhà
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setDialogContent({
                                    title: 'Sửa tòa nhà',
                                    bodyComponent: (
                                        <CreateApartment apartment={target} close={() => setOpenDialog(false)}></CreateApartment>
                                    ),
                                    width: 'xs'
                                });
                                setOpenDialog(true);
                                handleClose();
                            }}
                        >
                            Sửa tòa nhà
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={rooms.filter((e) => e.apartment_id == target.id)} key_search={'room_name'} />
            <CustomDialog
                title={dialogConent.title}
                bodyComponent={dialogConent.bodyComponent}
                width={dialogConent.width}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default Apartment;
