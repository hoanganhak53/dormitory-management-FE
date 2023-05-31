import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button } from '../../../../node_modules/@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React from 'react';
import CreateRegistration from './CreateRegistration';

const ARegistration = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [post, setPost] = React.useState({});

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                name: `Đăng ký chính thức kì 20222`,
                semester: `20222`,
                start_date: `12/05/2023 12:05`,
                end_date: `12/05/2023 12:05`,
                start_register: `12/05/2023 12:05`,
                end_register: `12/05/2023 12:05`,
                paid_date: `12/05/2023 12:05`,
                status: i
            });
        }
        return data;
    };

    const data = generateData(10);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Tên đợt đăng ký', width: 120 },
        { field: 'semester', headerName: 'Kỳ học', width: 80 },
        { field: 'start_date', headerName: 'Ngày bắt đầu', width: 120 },
        { field: 'end_date', headerName: 'Ngày kết thúc', width: 120 },
        { field: 'start_register', headerName: 'Mở đăng ký', width: 120 },
        { field: 'end_register', headerName: 'Đóng đăng ký', width: 120 },
        { field: 'paid_date', headerName: 'Hạn nộp', width: 120 },
        {
            field: 'action',
            headerName: '',
            width: 100,
            renderCell: (row) => {
                return (
                    <Button
                        onClick={() => {
                            setPost(row);
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
                <Grid item>
                    <Typography variant="h5">Đợt đăng ký</Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            setPost({});
                            setOpenDialog(true);
                        }}
                    >
                        Tạo đợt đăng ký
                    </Button>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />
            <CustomDialog
                title="Đợt đăng ký"
                width="sm"
                bodyComponent={<CreateRegistration></CreateRegistration>}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default ARegistration;
