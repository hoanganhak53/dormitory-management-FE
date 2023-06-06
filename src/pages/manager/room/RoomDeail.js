import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography, Button, IconButton } from '@mui/material/index';
import { Chip } from '@mui/material/index';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CustomDialog from 'components/CustomDialog';
import AddStudent from './AddStudent';

const RoomDetail = ({ viewDetail }) => {
    const [openDialog, setOpenDialog] = React.useState(false);

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                column1: `Nguyễn Duy Hoàng Anh ${i}`,
                column2: `${i}/10/2001`,
                column3: `2019${i % 10}123`,
                column4: `Khoa học máy tính`,
                column5: `092341232${i % 10}`
            });
        }
        return data;
    };
    const data = generateData(10);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'column1', headerName: 'Họ và tên', width: 350 },
        { field: 'column2', headerName: 'Ngày sinh', width: 120 },
        { field: 'column3', headerName: 'Mã số sinh viên', width: 120 },
        { field: 'column4', headerName: 'Ngành', width: 200 },
        { field: 'column5', headerName: 'Số điện thoại', width: 10 },
        {
            field: 'action',
            headerName: '',
            width: 100,
            renderCell: () => {
                return <Button color="error">Xóa</Button>;
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
                    <Typography variant="h5">Đăng ký các kỳ</Typography>
                    <Chip label="B3/202" color="success" sx={{ marginLeft: '10px' }} />
                </Grid>
                <Grid item>
                    <Button onClick={() => setOpenDialog(true)}>Thêm sinh viên</Button>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />;
            <CustomDialog
                title="Thêm sinh viên"
                width="sm"
                bodyComponent={<AddStudent></AddStudent>}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default RoomDetail;
