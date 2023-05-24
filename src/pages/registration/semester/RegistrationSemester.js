import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography } from '@mui/material/index';
import { Button } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import { openSnackBar } from 'store/reducers/menu';
import { useDispatch } from 'react-redux';
import { Chip } from '@mui/material/index';

const RegistrationSemester = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const dispatch = useDispatch();

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                column1: `B${i % 10}`,
                column2: `20${i % 10}`,
                column3: `2022${i % 10}`,
                column4: `04/04/2023 15:22:45`,
                column5: `04/04/2023 15:22:45`,
                status: i % 3
            });
        }
        return data;
    };
    const data = generateData(3);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'column1', headerName: 'Tòa nhà', width: 120 },
        { field: 'column2', headerName: 'Phòng đã đăng ký', width: 150 },
        { field: 'column3', headerName: 'Kỳ đăng ký', width: 120 },
        { field: 'column4', headerName: 'Ngày đăng ký', width: 200 },
        { field: 'column5', headerName: 'Ngày xác nhận', width: 200 }, //ngày mà sinh viên nộp tiền phòng, có thể lấy từ bảng fee
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 130,
            renderCell: (row) => {
                let label = '',
                    color = '';
                switch (row.status) {
                    case 0:
                        label = 'Thất bại'; //đăng ký nhưng ko nộp tiền
                        color = 'error';
                        break;
                    case 1:
                        label = 'Thành công'; //đăng ký và đc xếp chỗ ở
                        color = 'success';
                        break;
                    case 2:
                        label = 'Đang chờ'; //chờ nộp tiền
                        color = 'warning';
                        break;
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
                        <Button variant="container" onClick={() => setOpenDialog(true)}>
                            Đăng ký phòng
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />
            <CustomDialog
                title="Đăng ký"
                width="xs"
                bodyComponent={<>Đăng ký gì đó</>}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                actionComponent={
                    <Button
                        onClick={() =>
                            dispatch(
                                openSnackBar({
                                    message: 'error message',
                                    status: 'error'
                                })
                            )
                        }
                    >
                        Đăng ký
                    </Button>
                }
            />
        </Grid>
    );
};

export default RegistrationSemester;
