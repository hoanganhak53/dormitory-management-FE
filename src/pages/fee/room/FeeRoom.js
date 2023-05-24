import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import moment from 'moment/moment';
import { formatCurrency } from 'utils/fomat';
import { Chip } from '../../../../node_modules/@mui/material/index';

const FeeRoom = () => {
    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                apartment_name: `Nhà B1`,
                room_name: `Phòng ${i}`,
                fee_amount: `${formatCurrency(i * 450000)}`,
                created_date: `${new Date().getTime()}`,
                due_date: `${new Date().getTime()}`,
                payment_date: `${new Date().getTime()}`,
                status: i
            });
        }
        return data;
    };

    const data = generateData(3);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'apartment_name', headerName: 'Nhà', width: 80 },
        { field: 'room_name', headerName: 'Phòng', width: 80 },
        {
            field: 'action',
            headerName: 'Kỳ đăng ký',
            width: 70,
            renderCell: (row) => {
                return `2022${(row.id % 3) + 1}`;
            }
        },
        { field: 'fee_amount', headerName: 'Đơn giá', width: 150 },
        {
            field: 'action',
            headerName: 'Hạn nộp',
            width: 100,
            renderCell: (row) => {
                return `${moment(row.due_date * 1).format('L')}`;
            }
        },
        {
            field: 'action',
            headerName: 'Ngày nộp',
            width: 100,
            renderCell: (row) => {
                return `${moment(row.payment_date * 1).format('L')}`;
            }
        },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 100,
            renderCell: (row) => {
                const label = row.status % 2 ? 'Chưa nộp' : 'Đã nộp';
                const color = row.status % 2 ? 'error' : 'success';
                return (
                    <Chip label={label} sx={{ width: '70px', borderRadius: '15px', fontSize: '12px' }} color={color} size="small"></Chip>
                );
            }
        }
    ];
    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item>
                    <Typography variant="h5">Hóa đơn tiền phòng</Typography>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />
        </Grid>
    );
};

export default FeeRoom;
