import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button } from '../../../../node_modules/@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React from 'react';
import StudentPopup from './StudentPopup';

const Student = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [student, setStudent] = React.useState({});

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                full_name: `Hoàng Anh`,
                mssv: `20193980`,
                gender: `Nam`,
                batch: `K64`,
                apartment_name: `Nhà B1`,
                room_name: `Phòng ${i}`,
                status: i
            });
        }
        return data;
    };

    const data = generateData(200);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'full_name', headerName: 'Họ tên', width: 150 },
        { field: 'mssv', headerName: 'Mã số sinh viên', width: 120 },
        { field: 'gender', headerName: 'Giới tính', width: 80 },
        { field: 'batch', headerName: 'Khóa', width: 80 },
        { field: 'apartment_name', headerName: 'Nhà', width: 100 },
        { field: 'room_name', headerName: 'Phòng', width: 100 },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 80,
            renderCell: (row) => {
                const label = row.status % 2 ? 'Chưa xác thực' : 'Đã xác thực';
                const color = row.status % 2 ? 'error' : 'success';
                return (
                    <Chip label={label} sx={{ width: '100px', borderRadius: '15px', fontSize: '12px' }} color={color} size="small"></Chip>
                );
            }
        },
        {
            field: 'action',
            headerName: '',
            width: 100,
            renderCell: (row) => {
                return (
                    <Button
                        onClick={() => {
                            setStudent(row);
                            setOpenDialog(true);
                        }}
                    >
                        Xem chi tiết
                    </Button>
                );
            }
        }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item>
                    <Typography variant="h5">Danh sách sinh viên</Typography>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />
            <CustomDialog
                title="Chi tiết sinh viên"
                width="md"
                bodyComponent={<StudentPopup student={student}></StudentPopup>}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                actionComponent={<Button onClick={() => setOpenDialog(false)}>Hủy xác thực</Button>}
            />
        </Grid>
    );
};

export default Student;
