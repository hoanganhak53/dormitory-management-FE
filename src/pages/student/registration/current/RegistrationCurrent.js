import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography } from '@mui/material/index';
import { Chip } from '@mui/material/index';
import { axiosInstance } from 'utils/auth-header';
import { formatMajor } from 'utils/fomat';

const RegistrationCurrent = () => {
    const [students, setStudents] = React.useState([]);
    const [room, setRoom] = React.useState([]);

    React.useEffect(() => {
        let unsub = false;
        const init = async () => {
            try {
                await axiosInstance.get('student_room/current').then(async (res) => {
                    setStudents(res.data.data);
                    setRoom(res.data.current);
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, []);

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
        { field: 'phonenumber', headerName: 'Số điện thoại', width: 110 }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid container alignItems="center">
                    <Typography variant="h5">Phòng hiện tại</Typography>
                    <Chip label={`${room.apartment_name}/${room.room_name}`} color="success" sx={{ marginLeft: '10px' }} />
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={students} />
        </Grid>
    );
};

export default RegistrationCurrent;
