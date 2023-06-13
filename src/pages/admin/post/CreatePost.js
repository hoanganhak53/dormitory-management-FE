import React, { useState } from 'react';
import { FormLabel, Grid, TextField } from '@mui/material/index';
import CustomEditor from './CustomEditor';
import { Box, Button, MenuItem } from '../../../../node_modules/@mui/material/index';
import { styled } from '@mui/system';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { openSnackBar } from 'store/reducers/menu';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';

export const ImagePicker = styled(Box)`
    margin-top: 10px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
`;

//chú ý khi tọa post nó sẽ ko cập nhật ngay content. hãy ấn lung tung ở đâu đó để cập nhật
const CreatePost = ({ old_post = {}, close }) => {
    const [content, setContent] = useState(old_post.content || '');
    const [image, setImage] = useState(null);
    const [post, setPost] = React.useState(old_post.id ? old_post : { title: '', status: 1, image: '' });
    const dispatch = useDispatch();
    const storage = getStorage();

    const submitContent = async () => {
        const data = { ...post };
        data.content = content.toString();

        if (image) {
            const img_name = image.name + new Date().getTime();
            const storageRef = await ref(storage, img_name);
            await uploadBytes(storageRef, image).then(async (snapshot) => {
                await getDownloadURL(ref(storage, img_name)).then((url) => {
                    data.image = url;
                });
            });
        }

        try {
            if (data.id != null) {
                await axiosInstance.put('post', data).then(async (res) => {
                    dispatch(
                        openSnackBar({
                            message: res.data.message,
                            status: 'success'
                        })
                    );
                });
            } else {
                await axiosInstance.post('post', data).then(async (res) => {
                    dispatch(
                        openSnackBar({
                            message: res.data.message,
                            status: 'success'
                        })
                    );
                });
            }
            close();
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: err?.response?.data?.detail,
                    status: 'error'
                })
            );
        }
    };

    const handleFileChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                    <FormLabel>Tiêu đề</FormLabel>
                    <TextField
                        id="describe"
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                            setPost((prev) => {
                                const rs = { ...prev };
                                rs.title = e.target.value;
                                return rs;
                            })
                        }
                        placeholder="Tiêu đề bài đăng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={5.5}>
                    <FormLabel>Chọn ảnh</FormLabel>
                    <ImagePicker>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </ImagePicker>
                </Grid>
                <Grid item xs={5.5}>
                    <FormLabel>Trạng thái</FormLabel>
                    <TextField
                        select
                        fullWidth
                        value={post?.status}
                        onChange={(e) =>
                            setPost((prev) => {
                                const rs = { ...prev };
                                rs.status = e.target.value;
                                return rs;
                            })
                        }
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    >
                        <MenuItem value={1}>Hoạt động</MenuItem>
                        <MenuItem value={2}>Tạm ẩn</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            {(image || old_post.image) && (
                <Grid item xs={12} mb={3}>
                    <FormLabel sx={{ marginBottom: '10px', display: 'block' }}>Ảnh minh họa</FormLabel>
                    <img style={{ maxWidth: '100%' }} src={image ? URL.createObjectURL(image) : old_post.image} alt="Selected" />
                </Grid>
            )}
            <Grid item xs={12} mb={3}>
                <FormLabel>Nội dung</FormLabel>
                <CustomEditor content={content} setContent={setContent} />
            </Grid>
            <Grid container justifyContent="end">
                <Button onClick={submitContent}>{old_post.id ? 'Sửa' : 'Tạo'}</Button>
            </Grid>
        </Grid>
    );
};

export default CreatePost;
