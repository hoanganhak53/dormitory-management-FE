import { Grid, Typography } from '@mui/material/index';
import TableComponent from 'components/table/TableComponent';
import { Chip } from '@mui/material/index';
import { Button } from '../../../../node_modules/@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import React, { useEffect } from 'react';
import CreatePost from './CreatePost';
import { axiosInstance } from 'utils/auth-header';
import { formatTime } from 'utils/fomat';

const AdminPost = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [postList, setPostList] = React.useState([]);
    const [post, setPost] = React.useState({});

    useEffect(() => {
        let unsub = false;
        const init = async () => {
            try {
                await axiosInstance.get('post/list/all').then(async (res) => {
                    setPostList(res.data.data);
                });
            } catch (err) {}
        };

        init();
        return () => {
            unsub = true;
        };
    }, [openDialog]);

    const columns = [
        { field: 'created_user', headerName: 'Người tạo', width: 120 },
        { field: 'title', headerName: 'Tiêu đề', width: 450 },
        {
            field: 'action',
            headerName: 'Ngày tạo',
            width: 120,
            renderCell: function (row) {
                return formatTime(row.created_at);
            }
        },
        {
            field: 'action',
            headerName: 'Trạng thái',
            width: 80,
            renderCell: (row) => {
                const label = row.status == 2 ? 'Tạm ẩn' : 'Hoạt động';
                const color = row.status == 2 ? 'error' : 'success';
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
            <TableComponent columns={columns} data={postList} key_search={'title'} />
            <CustomDialog
                title="Bài viết"
                width="sm"
                bodyComponent={<CreatePost old_post={post} close={() => setOpenDialog(false)} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default AdminPost;
