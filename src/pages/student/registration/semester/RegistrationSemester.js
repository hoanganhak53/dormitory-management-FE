import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography } from '@mui/material/index';
import { Button } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import { Chip } from '@mui/material/index';
import { axiosInstance } from 'utils/auth-header';
import { formatCurrency, formatTime } from 'utils/fomat';
import RegisterRoom from './RegisterRoom';

const RegistrationSemester = () => {
    const [openDialog, setOpenDialog] = React.useState(false);

    const [registrations, setRegistrations] = React.useState([]);

    React.useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get('student/registration_list').then(async (res) => {
                    setRegistrations(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, [openDialog]);

    const columns = [
        { field: 'apartment_name', headerName: 'Tòa nhà', width: 120 },
        { field: 'room_name', headerName: 'Phòng', width: 70 },
        { field: 'room_type_name', headerName: 'Loại phòng', width: 120 }, //ngày mà sinh viên nộp tiền phòng, có thể lấy từ bảng fee
        {
            field: 'action',
            headerName: 'Số tiền',
            width: 120,
            renderCell: (row) => {
                return formatCurrency(row.room_price);
            }
        }, //ngày mà sinh viên nộp tiền phòng, có thể lấy từ bảng fee
        { field: 'registration_name', headerName: 'Đợt đăng ký', width: 200 },
        { field: 'semester', headerName: 'Kỳ học', width: 90 },
        {
            field: 'action',
            headerName: 'Ngày đăng ký',
            width: 180,
            renderCell: (row) => {
                return formatTime(row.created_at);
            }
        },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 130,
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
                    <Chip label={label} sx={{ width: '90px', borderRadius: '15px', fontSize: '12px' }} color={color} size="small"></Chip>
                );
            }
        }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Xem đăng ký</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => setOpenDialog(true)}>Đăng ký phòng</Button>
                    </Grid>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={registrations} />
            <CustomDialog
                title="Đăng ký"
                width="xs"
                bodyComponent={<RegisterRoom close={() => setOpenDialog(false)} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default RegistrationSemester;
