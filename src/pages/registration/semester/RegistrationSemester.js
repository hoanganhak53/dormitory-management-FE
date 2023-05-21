import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography } from '@mui/material/index';
import { Button } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import { openSnackBar } from 'store/reducers/menu';
import { useDispatch } from 'react-redux';

const RegistrationSemester = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const dispatch = useDispatch();

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                column1: `Row ${i}`,
                column2: `Value ${i}`,
                column3: `Data ${i}`,
                column4: `Data2 ${i}`,
                column5: `Data3 ${i}`
            });
        }
        return data;
    };
    const data = generateData(30);
    const columns = [
        { field: 'id', headerName: 'ID', width: '3%' },
        { field: 'column1', headerName: 'User Id', width: 70 },
        { field: 'column2', headerName: 'Title', width: 200 },
        { field: 'column3', headerName: '#HashTag', width: 200 },
        {
            field: 'action',
            headerName: '#tes',
            width: 200,
            renderCell: (row) => {
                return row.id + 'ád';
            }
        }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Phòng hiện tại</Typography>
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
                bodyComponent={<>ddd</>}
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
                        ddd
                    </Button>
                }
            />
        </Grid>
    );
};

export default RegistrationSemester;
