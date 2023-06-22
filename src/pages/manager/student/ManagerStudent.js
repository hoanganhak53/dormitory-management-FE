import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography, Button, MenuItem, TextField, Divider } from '@mui/material/index';
import { Chip } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import { axiosInstance } from 'utils/auth-header';
import { formatGender, formatMajor } from 'utils/fomat';
import { IconButton } from '../../../../node_modules/@mui/material/index';
import { EditOutlined } from '@ant-design/icons';
import EditStatus from './EditStatus';

const ManagerStudent = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const apartment_id = user.apartment_id;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [registrations, setRegistrations] = React.useState([]);
    const [apartment, setApartment] = React.useState({});
    const [dialogConent, setDialogContent] = React.useState({
        title: '',
        bodyComponent: <></>,
        width: 'sm'
    });

    React.useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get(`apartment/registration/${apartment_id}`).then((res) => {
                    setRegistrations(res.data.data);
                    setApartment(res.data.apartment);
                });
            } catch (err) {}
        };

        return init;
    }, [openDialog]);

    const columns = [
        { field: 'full_name', headerName: 'Họ và tên', width: 200 },
        { field: 'mssv', headerName: 'MSSV', width: 60 },
        { field: 'batch', headerName: 'Khóa', width: 50 },
        {
            field: 'action',
            headerName: 'Ngành',
            width: 200,
            renderCell: (row) => {
                return formatMajor(row.major);
            }
        },
        {
            field: 'action',
            headerName: 'Giới tính',
            width: 80,
            renderCell: (row) => {
                return formatGender(row.gender);
            }
        },
        { field: 'room_name', headerName: 'Phòng', width: 80 },
        { field: 'registration_name', headerName: 'Đợt đăng ký', width: 200 },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 90,
            renderCell: (row) => {
                let label = '',
                    color = '';
                switch (row.status) {
                    case 1:
                        label = 'Đã đăng ký';
                        color = 'warning';
                        break;
                    case 2:
                        label = 'Đã nộp tiền';
                        color = 'info';
                        break;
                    case 3:
                        label = 'Đã sắp xếp';
                        color = 'success';
                        break;
                    default:
                        label = 'Đã hủy';
                        color = 'error';
                }
                return (
                    <Chip label={label} sx={{ width: '80px', borderRadius: '15px', fontSize: '12px' }} color={color} size="small"></Chip>
                );
            }
        },
        {
            field: 'action',
            headerName: '',
            width: 50,
            renderCell: (row) => {
                return (
                    <IconButton
                        onClick={() => {
                            const data = {
                                registration_id: row.registration_id,
                                room_id: row.room_id,
                                user_id: row.user_id,
                                id: row.id
                            };
                            setDialogContent({
                                title: 'Chuyển trạng thái',
                                width: 'xs',
                                bodyComponent: (
                                    <EditStatus close={() => setOpenDialog(false)} d_status={row.status} registration={data}></EditStatus>
                                )
                            });
                            setOpenDialog(true);
                        }}
                    >
                        <EditOutlined></EditOutlined>
                    </IconButton>
                );
            }
        }
    ];

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item container alignItems="center" xs={4}>
                    <Typography variant="h5">Danh sách đăng ký - {apartment.apartment_name}</Typography>
                </Grid>
                <Grid item>
                    <TextField select value={value} sx={{ width: '120px' }} onChange={(e) => setValue(e.target.value)}>
                        <MenuItem value={0}>Tất cả</MenuItem>
                        <MenuItem value={1}>Đã đăng ký</MenuItem>
                        <MenuItem value={2}>Đã nộp</MenuItem>
                        <MenuItem value={3}>Đã sắp xếp</MenuItem>
                        <MenuItem value={4}>Đã hủy</MenuItem>
                    </TextField>
                    <Button
                        onClick={() => {
                            setDialogContent({
                                title: 'Xác nhận',
                                width: 'xs',
                                bodyComponent: <Confirmation setOpenDialog={setOpenDialog}></Confirmation>
                            });
                            setOpenDialog(true);
                        }}
                        sx={{ marginLeft: '8px' }}
                    >
                        Sắp xếp
                    </Button>
                </Grid>
            </Grid>
            <TableComponent
                columns={columns}
                data={registrations.filter((e) => {
                    if (value == 0) return true;
                    return e.status == value;
                })}
            />
            <CustomDialog
                title={dialogConent.title}
                width={dialogConent.width}
                bodyComponent={dialogConent.bodyComponent}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default ManagerStudent;

const Confirmation = ({ setOpenDialog }) => {
    return (
        <Grid>
            <Grid container mb={2}>
                <Typography variant="h5">Bạn có muốn sắp xếp sinh viên không?</Typography>
                <Typography>Chú ý chỉ sắp xếp các sinh viên chưa có đã nộp tiền vào các phòng trống.</Typography>
            </Grid>
            <Divider />
            <Grid container mt={1.5} justifyContent="end">
                <Button variant="outlined" size="small" onClick={() => setOpenDialog(false)}>
                    Hủy bỏ
                </Button>
                <Button variant="contained" size="small" sx={{ marginLeft: '5px' }}>
                    Sắp xếp
                </Button>
            </Grid>
        </Grid>
    );
};
