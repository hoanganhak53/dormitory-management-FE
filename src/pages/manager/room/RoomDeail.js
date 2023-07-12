import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography, Button, IconButton } from '@mui/material/index';
import { Chip } from '@mui/material/index';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CustomDialog from 'components/CustomDialog';
import AddStudent from './AddStudent';
import { axiosInstance } from 'utils/auth-header';
import { formatMajor } from 'utils/fomat';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const RoomDetail = ({ viewDetail, apartment, room }) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [students, setStudents] = React.useState([]);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        let unsub = false;

        const init = async () => {
            try {
                await axiosInstance.get(`room/detail/${room.id}`).then((res) => {
                    setStudents(res.data.data);
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, [openDialog, refresh]);

    const removeStudent = async (e) => {
        try {
            const body = {
                user_id: e.id,
                room_id: e.room_id
            };
            await axiosInstance.post(`student/remove_to_room`, body).then((res) => {
                dispatch(
                    openSnackBar({
                        message: res.data?.message,
                        status: 'success'
                    })
                );
                setRefresh(!refresh);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        { field: 'full_name', headerName: 'Họ và tên', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'birth', headerName: 'Ngày sinh', width: 120 },
        { field: 'mssv', headerName: 'Mã số sinh viên', width: 120 },
        { field: 'batch', headerName: 'Khoá', width: 70 },
        {
            field: 'action',
            headerName: 'Ngành',
            width: 200,
            renderCell: (row) => {
                return formatMajor(row.major);
            }
        },
        { field: 'phonenumber', headerName: 'Số điện thoại', width: 110 },
        {
            field: 'action',
            headerName: '',
            width: 100,
            renderCell: (row) => {
                return (
                    <Button color="error" onClick={() => removeStudent(row)}>
                        Xóa
                    </Button>
                );
            }
        }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item container alignItems="center" xs={4}>
                    <IconButton onClick={() => viewDetail(0, {})} sx={{ marginRight: '5px' }}>
                        <ArrowLeftOutlined />
                    </IconButton>
                    <Typography variant="h5">Phòng 202 - {apartment.apartment_name}</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={() => setOpenDialog(true)}>Thêm sinh viên</Button>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={students} />
            <CustomDialog
                title="Thêm sinh viên"
                width="sm"
                bodyComponent={
                    <AddStudent
                        apartment_id={apartment.id}
                        room_type_id={room.room_type_id}
                        room_id={room.id}
                        close={() => setOpenDialog(false)}
                    ></AddStudent>
                }
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default RoomDetail;
