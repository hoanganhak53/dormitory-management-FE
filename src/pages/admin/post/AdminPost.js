import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button } from '../../../../node_modules/@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React from 'react';
import CreatePost from './CreatePost';

const AdminPost = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [post, setPost] = React.useState({});

    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                name: `Hoàng Anh`,
                title: `THÔNG BÁO XẾP Ở NÔI TRÚ CHO SINH VIÊN K67 KỲ I NĂM HỌC 2022-2023`,
                created_date: `12/05/2023 12:05`,
                status: i
            });
        }
        return data;
    };

    const data = generateData(10);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Người tạo', width: 120 },
        { field: 'title', headerName: 'Tiêu đề', width: 450 },
        { field: 'created_date', headerName: 'Ngày tạo', width: 120 },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 80,
            renderCell: (row) => {
                const label = row.status % 2 ? 'Tạm ẩn' : 'Hoạt động';
                const color = row.status % 2 ? 'error' : 'success';
                return (
                    <Chip label={label} sx={{ width: '80px', borderRadius: '15px', fontSize: '12px' }} color={color} size="small"></Chip>
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
                    <Typography variant="h5">Danh sách bài đăng</Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            setPost({});
                            setOpenDialog(true);
                        }}
                    >
                        Tạo bài viết
                    </Button>
                </Grid>
            </Grid>
            <TableComponent columns={columns} data={data} />
            <CustomDialog
                title="Bài viết"
                width="sm"
                bodyComponent={<CreatePost post={post} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default AdminPost;
