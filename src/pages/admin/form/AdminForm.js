import MainCard from 'components/MainCard';
import React, { useState } from 'react';

// material-ui
import { Button, Grid, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup, IconButton, Checkbox } from '@mui/material/index';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// project import
import { TextField, Typography, Box } from '@mui/material/index';
import CustomDialog from 'components/CustomDialog';
import CreateQA from './CreateQA';

export const AdminForm = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [QA, setQA] = useState(null);
    const [form, setForm] = useState([
        {
            id: 1,
            weight: 0.3,
            type: 0,
            answers: ['Tùy chọn 1', 'Tùy chọn 2'],
            question: 'abc',
            matrix: {
                0: [0, 0.6],
                1: [0.6, 0]
            }
        }
    ]);

    const addItemForm = (item) => {
        if (form.find((e) => e.id == item?.id)) {
            setForm((prev) => {
                const rs = prev.map((e) => {
                    if (e.id == item?.id) {
                        return item;
                    }
                    return e;
                });
                return rs;
            });
        } else {
            setForm([...form, item]);
        }
    };

    return (
        <Grid container rowSpacing={2.5} columnSpacing={2.75} alignItems="center" justifyContent="center" mt={2}>
            <Grid container alignItems="center" justifyContent="space-between" ml={6}>
                <Grid item>
                    <Typography variant="h5">Biểu mẫu thông tin bổ sung</Typography>
                </Grid>
                <Grid item>
                    <Button onClick={() => setOpenDialog(true)}>Tạo câu hỏi</Button>
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
                                        control={e.type == 1 ? <Checkbox /> : <Radio />}
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
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => setForm(form.filter((e, f_index) => f_index != index))}
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </Box>
                    </MainCard>
                </Grid>
            ))}

            <Grid item xs={7}>
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
            </Grid>

            {/* <Grid container justifyContent="center" mt={2}>
                <AnimateButton>
                    <Button disableElevation size="small" type="submit" variant="contained" color="primary">
                        Lưu biểu mẫu
                    </Button>
                </AnimateButton>
            </Grid> */}
            <CustomDialog
                title="Tạo câu hỏi"
                width="sm"
                bodyComponent={<CreateQA QA={QA} addItemForm={addItemForm} setOpenDialog={setOpenDialog} />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </Grid>
    );
};

export default AdminForm;
