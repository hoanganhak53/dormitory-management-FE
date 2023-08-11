import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography, Button, MenuItem, TextField, Divider } from '@mui/material/index';
import { Chip } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import { axiosInstance } from 'utils/auth-header';
import { formatGender, formatMajor } from 'utils/fomat';
import { FormLabel, IconButton } from '../../../../node_modules/@mui/material/index';
import { EditOutlined } from '@ant-design/icons';
import EditStatus from './EditStatus';
import { openSnackBar } from 'store/reducers/menu';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import Arrange from './Arrange';

const ManagerStudent = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const apartment_id = user.apartment_id;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [value_room_type, setValueRoomType] = React.useState('all');
    const [registrations, setRegistrations] = React.useState([]);
    const [apartment, setApartment] = React.useState({});
    const [room_type_unique, setRoomTypeUnique] = React.useState([]);
    const [dialogConent, setDialogContent] = React.useState({
        title: '',
        bodyComponent: <></>,
        width: 'sm'
    });

    React.useEffect(() => {
        let unsub = false;

        const init = async () => {
            try {
                await axiosInstance.get(`apartment/registration/${apartment_id}`).then((res) => {
                    setRegistrations(res.data.data);
                    setApartment(res.data.apartment);
                    setRoomTypeUnique([...new Set(res.data.data.map((item) => item.room_type_name))]);
                });
            } catch (err) {}
        };

        init();

        return () => {
            unsub = true;
        };
    }, [openDialog]);

    const columns = [
        { field: 'full_name', headerName: 'Họ và tên', width: 180 },
        { field: 'mssv', headerName: 'MSSV', width: 60 },
        { field: 'batch', headerName: 'Khóa', width: 50 },
        {
            field: 'action',
            headerName: 'Ngành',
            width: 180,
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
        { field: 'room_type_name', headerName: 'Loại phòng', width: 120 },
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
                    {value_room_type != 'all' && (
                        <Button
                            onClick={() => {
                                setDialogContent({
                                    title: 'Xác nhận',
                                    width: 'xs',
                                    bodyComponent: (
                                        <Confirmation
                                            setOpenDialog={setOpenDialog}
                                            apartment_id={apartment_id}
                                            room_type_name={value_room_type}
                                            setDialogContent={setDialogContent}
                                        ></Confirmation>
                                    )
                                });
                                setOpenDialog(true);
                            }}
                            sx={{ marginLeft: '8px' }}
                        >
                            Sắp xếp
                        </Button>
                    )}
                    <TextField select value={value} sx={{ width: '120px' }} onChange={(e) => setValue(e.target.value)}>
                        <MenuItem value={0}>Tất cả</MenuItem>
                        <MenuItem value={1}>Đã đăng ký</MenuItem>
                        <MenuItem value={2}>Đã nộp</MenuItem>
                        <MenuItem value={3}>Đã sắp xếp</MenuItem>
                        <MenuItem value={4}>Đã hủy</MenuItem>
                    </TextField>
                    <TextField
                        select
                        value={value_room_type}
                        sx={{ width: '140px', marginLeft: '10px' }}
                        onChange={(e) => {
                            setValueRoomType(e.target.value);
                        }}
                    >
                        <MenuItem value={'all'}>Tất cả</MenuItem>
                        {room_type_unique.map((e) => (
                            <MenuItem value={e} key={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <TableComponent
                columns={columns}
                data={registrations
                    .filter((e) => {
                        if (value == 0) return true;
                        return e.status == value;
                    })
                    .filter((e) => {
                        if (value_room_type == 'all') return true;
                        return e.room_type_name == value_room_type;
                    })}
                key_search={'full_name'}
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

const Confirmation = ({ setOpenDialog, room_type_name, apartment_id, setDialogContent }) => {
    const dispatch = useDispatch();
    const [fuzzy_m, setFuzzyM] = React.useState(2);
    const [max_loop, setMaxLoop] = React.useState(50);
    const [epsilon, setEpsilon] = React.useState(0.000001);
    const [algorithm, setAlgorithm] = React.useState(1);

    const submit = async () => {
        try {
            const data = {
                room_type_name,
                apartment_id,
                fuzzy_m,
                max_loop,
                epsilon,
                algorithm
            };
            await axiosInstance.post('apartment/cluster', data).then(async (res) => {
                setDialogContent({
                    title: 'Sắp xếp sinh viên',
                    bodyComponent: <Arrange result={res.data.data} close={() => setOpenDialog(false)} statistic={res.data.statistic} />,
                    width: 'md'
                });
            });
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: 'Sắp xếp bị lỗi, hãy thử lại sau',
                    status: 'error'
                })
            );
        }
    };
    return (
        <Grid>
            <Grid container mb={2}>
                <Typography variant="h5">Bạn có muốn sắp xếp sinh viên không?</Typography>
                <Typography>Chú ý chỉ sắp xếp các sinh viên đã đăng ký loại phòng hiện tại và đã nộp tiền.</Typography>
            </Grid>
            <Grid container mb={2} justifyContent="start">
                <FormLabel>Hệ số mờ hóa</FormLabel>
                <TextField
                    type="text"
                    value={fuzzy_m}
                    onChange={(e) => setFuzzyM(e.target.value)}
                    placeholder="Hệ số mờ hóa"
                    fullWidth
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
                />
                <FormLabel>Số vòng lặp tối đa</FormLabel>
                <TextField
                    type="text"
                    value={max_loop}
                    onChange={(e) => setMaxLoop(e.target.value)}
                    placeholder="Số vòng lặp tối đa"
                    fullWidth
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
                />
                <FormLabel>Điểm dừng</FormLabel>
                <TextField
                    type="text"
                    value={epsilon}
                    onChange={(e) => setEpsilon(e.target.value)}
                    placeholder="Điểm dừng"
                    fullWidth
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
                />
                <FormLabel htmlFor="gender" sx={{ width: '150px' }}>
                    Thuật toán
                </FormLabel>
                <TextField
                    select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    fullWidth
                    sx={{ marginTop: '10px', marginBottom: '20px' }}
                >
                    <MenuItem value={1}>Fuzzy C-Means</MenuItem>
                    <MenuItem value={2}>K-Means</MenuItem>
                </TextField>
            </Grid>
            <Divider />
            <Grid container mt={1.5} justifyContent="end">
                <Button variant="outlined" size="small" onClick={() => setOpenDialog(false)}>
                    Hủy bỏ
                </Button>
                <Button onClick={submit} variant="contained" size="small" sx={{ marginLeft: '5px' }}>
                    Sắp xếp
                </Button>
            </Grid>
        </Grid>
    );
};
