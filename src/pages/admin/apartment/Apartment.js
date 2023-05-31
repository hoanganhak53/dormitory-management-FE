import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button, MenuItem, Stack, TextField, Grid } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React from 'react';
import { Menu, Typography } from '../../../../node_modules/@mui/material/index';
import { formatCurrency } from 'utils/fomat';
import EditRoom from './EditRoom';
import RoomType from './RoomType';
import CreateApartment from './CreateApartment';

const Apartment = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogConent, setDialogContent] = React.useState({
        title: '',
        bodyComponent: <></>,
        width: 'sm'
    });

    const [apartment, setApartment] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                room_number: `211`,
                apartment_name: 'B1',
                capacity: `8`,
                student_num: `6`,
                room_price: `400000`,
                gender: `Nữ`,
                room_type_name: `Phòng 8 nữ full`,
                status: i
            });
        }
        return data;
    };

    const data = generateData(10);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'room_number', headerName: 'Số phòng', width: 100 },
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
        { field: 'gender', headerName: 'Giới tính', width: 100 },
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
                                bodyComponent: <EditRoom></EditRoom>,
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
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item xs={3.5}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <TextField id="apartment" value="" select name="apartment" label="Toà nhà" fullWidth>
                            <MenuItem value={1}>B1</MenuItem>
                            <MenuItem value={2}>B2</MenuItem>
                            <MenuItem value={3}>B3</MenuItem>
                        </TextField>
                        <Chip label="10 phòng" sx={{ width: 'fit-content', borderRadius: '15px', fontSize: '14px' }}></Chip>
                        <Chip label="70 sinh viên" sx={{ width: 'fit-content', borderRadius: '15px', fontSize: '14px' }}></Chip>
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
                                    bodyComponent: <RoomType></RoomType>,
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
                                    bodyComponent: <EditRoom></EditRoom>,
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
                                    bodyComponent: <CreateApartment></CreateApartment>,
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
                                    bodyComponent: <CreateApartment></CreateApartment>,
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
            <TableComponent columns={columns} data={data} />
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
