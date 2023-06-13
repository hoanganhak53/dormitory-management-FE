import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button } from '../../../../node_modules/@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React, { useEffect } from 'react';
import StudentPopup from './StudentPopup';
import { axiosInstance } from 'utils/auth-header';
import { formatGender } from 'utils/fomat';

const Student = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [student, setStudent] = React.useState({});
    const [studentList, setStudentList] = React.useState([]);

    const columns = [
        { field: 'full_name', headerName: 'Họ tên', width: 150 },
        { field: 'mssv', headerName: 'Mã số sinh viên', width: 120 },
        {
            field: 'action',
            headerName: 'Giới tính',
            width: 80,
            renderCell: function (row) {
                return formatGender(row.gender);
            }
        },
        { field: 'batch', headerName: 'Khóa', width: 80 },
        {
            field: 'action',
            headerName: 'Nhà',
            width: 100,
            renderCell: function (row) {
                return row.apartment_name || 'N/A';
            }
        },
        {
            field: 'action',
            headerName: 'Phòng',
            width: 100,
            renderCell: function (row) {
                return row.room_name || 'N/A';
            }
        },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 80,
            renderCell: (row) => {
                const label = !row.is_valid ? 'Chưa xác thực' : 'Đã xác thực';
                const color = !row.is_valid ? 'error' : 'success';
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

    useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.post('user_type/students/all').then(async (res) => {
                    setStudentList(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, [openDialog]);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item>
                    <Typography variant="h5">Danh sách sinh viên</Typography>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={studentList} />
            <CustomDialog
                title="Chi tiết sinh viên"
                width="md"
                bodyComponent={<StudentPopup user={student} close={() => setOpenDialog(false)}></StudentPopup>}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default Student;
