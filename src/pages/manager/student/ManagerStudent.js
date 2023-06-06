import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography, Button, MenuItem, TextField, Divider } from '@mui/material/index';
import { Chip } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';

const ManagerStudent = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [value, setValue] = React.useState(3);

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                column1: `Nguyễn Duy Hoàng Anh ${i}`,
                column2: `${i}/10/2001`,
                column3: `2019${i % 10}123`,
                column4: `Khoa học máy tính`,
                column5: `092341232${i % 10}`,
                column6: `20${i % 10}`,
                status: i
            });
        }
        return data;
    };
    const data = generateData(10);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'column1', headerName: 'Họ và tên', width: 200 },
        { field: 'column2', headerName: 'Ngày sinh', width: 120 },
        { field: 'column3', headerName: 'Mã số sinh viên', width: 120 },
        { field: 'column4', headerName: 'Ngành', width: 200 },
        { field: 'column5', headerName: 'Số điện thoại', width: 100 },
        { field: 'column6', headerName: 'Phòng', width: 80 },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 100,
            renderCell: (row) => {
                const label = row.status % 2 ? 'Đã nộp' : 'Đã đăng ký';
                const color = row.status % 2 ? 'info' : 'success';
                return (
                    <Chip label={label} sx={{ width: '80px', borderRadius: '15px', fontSize: '12px' }} color={color} size="small"></Chip>
                );
            }
        },
        {
            field: 'action',
            headerName: '',
            width: 120,
            renderCell: () => {
                return <Button>Trạng thái</Button>;
            }
        }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item container alignItems="center" xs={4}>
                    <Typography variant="h5">Danh sách sinh viên</Typography>
                </Grid>
                <Grid item>
                    <TextField select value={value} sx={{ width: '120px' }} onChange={(e) => setValue(e.target.value)}>
                        <MenuItem value={3}>Tất cả</MenuItem>
                        <MenuItem value={0}>Đã nộp</MenuItem>
                        <MenuItem value={1}>Đã đăng ký</MenuItem>
                        <MenuItem value={2}>Đã sắp xếp</MenuItem>
                    </TextField>
                    <Button onClick={() => setOpenDialog(true)} sx={{ marginLeft: '8px' }}>
                        Sắp xếp
                    </Button>
                </Grid>
            </Grid>
            <TableComponent
                columns={columns}
                data={data.filter((e) => {
                    if (value == 3) return true;
                    return e.status % 3 == value;
                })}
            />
            <CustomDialog
                title="Xác nhận"
                width="xs"
                bodyComponent={<Confirmation setOpenDialog={setOpenDialog}></Confirmation>}
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
                <Typography>
                    Chú ý chỉ sắp xếp các sinh viên chưa có phòng vào các phòng trống. Quá trình này có thể mất vài giây
                </Typography>
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
