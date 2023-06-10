import React, { useState } from 'react';
import { Button, FormLabel, Grid } from '../../../../../node_modules/@mui/material/index';
import { ImagePicker } from 'pages/admin/post/CreatePost';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { axiosInstance } from 'utils/auth-header';
import { openSnackBar } from 'store/reducers/menu';

const ChangeAvatar = ({ close }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const storage = getStorage();

    const submitContent = () => {
        const img_name = image.name + new Date().getTime();
        const storageRef = ref(storage, img_name);
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(ref(storage, img_name)).then(async (url) => {
                console.log(url);
                await axiosInstance
                    .put('profile/change', {
                        avatar: url
                    })
                    .then((res) => {
                        const user = JSON.parse(localStorage.getItem('user'));
                        user.avatar = url;
                        localStorage.setItem('user', JSON.stringify(user));
                        close();
                        dispatch(
                            openSnackBar({
                                message: 'Cập nhật ảnh đại diện thành công',
                                status: 'success'
                            })
                        );
                    });
            });
        });
    };

    const handleFileChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <FormLabel>Chọn ảnh</FormLabel>
                <ImagePicker>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </ImagePicker>
            </Grid>
            <Grid container item xs={12} justifyContent="end" mt={3}>
                <Button onClick={submitContent}>Cập nhật</Button>
            </Grid>
        </Grid>
    );
};

export default ChangeAvatar;
