import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material/index';
import { Checkbox, MenuItem, Radio, TextField } from '@mui/material/index';
import { Button, IconButton } from '../../../node_modules/@mui/material/index';
import { CloseOutlined } from '@ant-design/icons';
import CustomDialog from 'components/CustomDialog';

export const debounce = (func, delay) => {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
};

const CreateQA = () => {
    const [question, setQuestion] = useState('');
    const [type, setType] = useState(0);
    const [answers, setAnwsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const addAnwsers = (event) => {
        if (event.key == 'Enter') {
            setAnwsers((prev) => [...prev, event.target.value]);
            event.target.value = `Tùy chọn ${answers.length + 2}`;
        }
    };

    const changeAnwser = debounce((event, index) => {
        setAnwsers((prev) => {
            const rs = prev.map((e, i) => {
                if (i == index) {
                    return event.target.value;
                }
                return e;
            });
            return rs;
        });
    }, 500);

    const deleteAnwser = (index) => {
        const rs = answers.filter((e, i) => {
            return i !== index;
        });
        setAnwsers(rs);
    };

    return (
        <Grid container px={1.5} py={2.5}>
            <Grid container mb={3} direction="row" justifyContent="space-between">
                <Grid item xs={7.5}>
                    <TextField
                        variant="filled"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Câu hỏi"
                        label="Câu hỏi"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField id="gender" select value={type} onChange={(e) => setType(e.target.value)} fullWidth>
                        <MenuItem value={0}>
                            <Radio sx={{ padding: '4px', paddingRight: '10px' }} disabled />
                            Trắc nghiệm
                        </MenuItem>
                        <MenuItem value={1}>
                            <Checkbox sx={{ padding: '4px', paddingRight: '10px' }} disabled />
                            Hộp kiểm
                        </MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            {answers.map((e, index) => {
                return (
                    <Grid container mb={2} key={e + index} alignItems="center">
                        <Grid item xs={0.9}>
                            {type == 1 ? <Checkbox disabled sx={{ marginRight: '0px' }} /> : <Radio disabled sx={{ marginRight: '0px' }} />}
                        </Grid>

                        <Grid item xs={10.7}>
                            <TextField
                                variant="standard"
                                defaultValue={e}
                                onChange={(e) => changeAnwser(e, index)}
                                placeholder="Câu trả lời"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={0.3}>
                            <IconButton
                                disableRipple
                                color="secondary"
                                sx={{ color: 'text.primary' }}
                                aria-label="open profile"
                                aria-controls={open ? 'profile-grow' : undefined}
                                aria-haspopup="true"
                                onClick={() => deleteAnwser(index)}
                            >
                                <CloseOutlined />
                            </IconButton>
                        </Grid>
                    </Grid>
                );
            })}
            <Grid container alignItems="center">
                <Grid item xs={0.9}>
                    {type == 1 ? <Checkbox disabled sx={{ marginRight: '0px' }} /> : <Radio disabled sx={{ marginRight: '0px' }} />}
                </Grid>

                <Grid item xs={11}>
                    <TextField
                        variant="standard"
                        defaultValue={`Tùy chọn ${answers.length + 1}`}
                        onKeyDown={(e) => addAnwsers(e)}
                        placeholder="Câu trả lời"
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Button onClick={() => setOpenDialog(true)}>Đặt trọng số</Button>
            <CustomDialog title="Tạo câu hỏi" width="sm" bodyComponent={<>aa</>} open={openDialog} onClose={() => setOpenDialog(false)} />
        </Grid>
    );
};

export default CreateQA;
