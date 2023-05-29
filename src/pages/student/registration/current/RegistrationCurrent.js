import TableComponent from 'components/table/TableComponent';
import * as React from 'react';
import { Grid, Typography } from '@mui/material/index';
import { Chip } from '@mui/material/index';

const RegistrationCurrent = (props) => {
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
        { field: 'column5', headerName: 'Số điện thoại', width: 150 }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid container alignItems="center">
                    <Typography variant="h5">Đăng ký các kỳ</Typography>
                    <Chip label="B3/202" color="success" sx={{ marginLeft: '10px' }} />
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />;
        </Grid>
    );
};

export default RegistrationCurrent;
