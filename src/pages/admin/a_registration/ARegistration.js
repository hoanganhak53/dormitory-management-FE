import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button, IconButton } from '../../../../node_modules/@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React, { useEffect } from 'react';
import CreateRegistration from './CreateRegistration';
import { axiosInstance } from 'utils/auth-header';
import { formatTime } from 'utils/fomat';
import { EditOutlined } from '@ant-design/icons';

const ARegistration = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [registrations, setRegistrations] = React.useState([]);
    const [target, setTarget] = React.useState({});

    const columns = [
        { field: 'registration_name', headerName: 'Tên đợt đăng ký', width: 200 },
        { field: 'semester', headerName: 'Kỳ học', width: 80 },
        {
            field: 'action',
            headerName: 'Ngày bắt đầu',
            width: 120,
            renderCell: function (row) {
                return formatTime(row.start_date);
            }
        },
        {
            field: 'action',
            headerName: 'Ngày kết thúc',
            width: 120,
            renderCell: function (row) {
                return formatTime(row.end_date);
            }
        },
        {
            field: 'action',
            headerName: 'Mở đăng ký',
            width: 120,
            renderCell: function (row) {
                return formatTime(row.start_register);
            }
        },
        {
            field: 'action',
            headerName: 'Đóng đăng ký',
            width: 120,
            renderCell: function (row) {
                return formatTime(row.end_register);
            }
        },
        {
            field: 'action',
            headerName: 'Hạn nộp',
            width: 120,
            renderCell: function (row) {
                return formatTime(row.paid_date);
            }
        },
        {
            field: 'action',
            headerName: '',
            width: 20,
            renderCell: (row) => {
                return (
                    <IconButton
                        onClick={() => {
                            setTarget(row);
                            setOpenDialog(true);
                        }}
                    >
                        <EditOutlined />
                    </IconButton>
                );
            }
        }
    ];

    useEffect(() => {
        let unsub = false;
        const init = async () => {
            try {
                await axiosInstance.get('registration/list').then(async (res) => {
                    setRegistrations(res.data.data);
                });
            } catch (err) {}
        };
        init();

        return () => {
            unsub = true;
        };
    }, [openDialog]);

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <Grid item>
                    <Typography variant="h5">Đợt đăng ký</Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            setTarget({});
                            setOpenDialog(true);
                        }}
                    >
                        Tạo đợt đăng ký
                    </Button>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={registrations} key_search={'registration_name'} />
            <CustomDialog
                title="Đợt đăng ký"
                width="sm"
                bodyComponent={<CreateRegistration registration_old={target} close={() => setOpenDialog(false)}></CreateRegistration>}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default ARegistration;
