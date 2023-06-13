import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup, IconButton, Checkbox } from '@mui/material/index';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// project import
import { TextField, Typography, Box } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import CreateQA from './CreateQA';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

export const AdminForm = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [QA, setQA] = useState({});
    const [form, setForm] = useState([]);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get('form/list').then(async (res) => {
                    setForm(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, [openDialog, refresh]);

    const deleteQA = async (e) => {
        try {
            await axiosInstance.delete(`form/${e.id}`).then(async (res) => {
                dispatch(
                    openSnackBar({
                        message: res.data.message,
                        status: 'success'
                    })
                );
            });
            setRefresh(!refresh);
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: err?.response?.data?.detail,
                    status: 'error'
                })
            );
        }
    };

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75} alignItems="center" justifyContent="center" mt={2}>
            <Grid container alignItems="center" justifyContent="space-between" ml={6}>
                <Grid item>
                    <Typography variant="h5">Biểu mẫu thông tin bổ sung</Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={() => {
                            setOpenDialog(true);
                            setQA({});
                        }}
                    >
                        Tạo câu hỏi
                    </Button>
                </Grid>
            </Grid>
            {form.map((e, index) => (
                <Grid item xs={7} sx={{ position: 'relative' }} key={index}>
                    <MainCard>
                        <FormControl>
                            <FormLabel id="time_in_ktx">
                                {e.question}
                                <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                            </FormLabel>
                            <RadioGroup>
                                {e.answers.map((option, i) => (
                                    <FormControlLabel
                                        disabled
                                        key={option + i}
                                        value={option}
                                        control={e.form_type == 1 ? <Checkbox /> : <Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{ position: 'absolute', right: '25px', top: '35px' }}>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                sx={{ marginRight: '1px' }}
                                onClick={() => {
                                    setQA(e);
                                    setOpenDialog(true);
                                }}
                            >
                                <EditOutlined />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteQA(e)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Box>
                    </MainCard>
                </Grid>
            ))}

            {/* <Grid item xs={7}>
                <MainCard>
                    <FormLabel id="describe">
                        Giới thiệu ngắn gọn
                        <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                    </FormLabel>
                    <TextField
                        id="describe"
                        type="text"
                        name="describe"
                        placeholder="Câu trả lời của bạn"
                        fullWidth
                        variant="standard"
                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                        disabled
                    />
                </MainCard>
            </Grid> */}

            <CustomDialog
                title="Tạo câu hỏi"
                width="sm"
                bodyComponent={<CreateQA QA={QA} setOpenDialog={setOpenDialog} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default AdminForm;
