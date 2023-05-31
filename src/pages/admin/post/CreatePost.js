import React, { useState } from 'react';
import { FormLabel, Grid, TextField } from '@mui/material/index';
import CustomEditor from './CustomEditor';
import { Box, Button } from '../../../../node_modules/@mui/material/index';
import { styled } from '@mui/system';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ImagePicker = styled(Box)`
    margin-top: 10px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
`;

const CreatePost = () => {
    const [content, setContent] = useState('<h1>asdasdasd</h1>');
    const [image, setImage] = useState(null);

    const storage = getStorage();

    const submitContent = () => {
        const img_name = image.name + new Date().getTime();
        const storageRef = ref(storage, img_name);
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(ref(storage, img_name)).then((url) => {
                console.log(url);
            });
        });
        console.log(content);
    };

    const handleFileChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    return (
        <Grid container>
            <Grid container justifyContent="space-between">
                <Grid item xs={7}>
                    <FormLabel>Tiêu đề</FormLabel>
                    <TextField
                        id="describe"
                        type="text"
                        name="describe"
                        placeholder="Tiêu đề bài đăng"
                        fullWidth
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                    />
                </Grid>
                <Grid item xs={4.5}>
                    <FormLabel>Chọn ảnh</FormLabel>
                    <ImagePicker>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </ImagePicker>
                </Grid>
            </Grid>
            {image && (
                <Grid item xs={12} mb={3}>
                    <FormLabel sx={{ marginBottom: '10px', display: 'block' }}>Ảnh minh họa</FormLabel>
                    <img style={{ maxWidth: '100%' }} src={URL.createObjectURL(image)} alt="Selected" />
                </Grid>
            )}
            <Grid item xs={12} mb={3}>
                <FormLabel>Nội dung</FormLabel>
                <CustomEditor content={content} setContent={setContent} />
            </Grid>
            <Grid container justifyContent="space-between">
                <Button onClick={() => submitContent()}>Tạo</Button>
            </Grid>
        </Grid>
    );
};

export default CreatePost;
