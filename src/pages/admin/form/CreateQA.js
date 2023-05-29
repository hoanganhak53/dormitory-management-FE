import React, { useState } from 'react';
import { Grid } from '@mui/material/index';
import { Checkbox, MenuItem, Radio, TextField, Button, IconButton, Slider, Typography } from '@mui/material/index';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openSnackBar } from 'store/reducers/menu';
import MatrixSelect, { valueMatrix } from './MatrixSelect';

export const debounce = (func, delay) => {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
};

const generateMatrix = (n) => {
    var result = {};

    for (var i = 0; i < n; i++) {
        result[i] = Array(n).fill(0);
    }
    return result;
};

const CreateQA = ({ addItemForm, setOpenDialog, QA = null }) => {
    const [question, setQuestion] = useState(QA?.question || '');
    const [type, setType] = useState(QA?.type || 0);
    const [weight, setWeight] = useState(QA?.weight || 0.1);
    const [answers, setAnwsers] = useState(QA?.answers || []);
    const [matrix, setMatrix] = useState(QA?.matrix || {});

    const [step, setStep] = useState(0);
    const dispatch = useDispatch();

    const setElement = (i, j, value) => {
        const clone = { ...matrix };
        clone[i][j] = value;
        clone[j][i] = value;
        setMatrix(clone);
    };

    const addAnwsers = (event) => {
        if (answers.length >= 8) {
            dispatch(
                openSnackBar({
                    message: 'Một câu hỏi có tối đa 8 câu trả lời',
                    status: 'error'
                })
            );
            return;
        }
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

    const nextStep = () => {
        if (question.length == 0) {
            dispatch(
                openSnackBar({
                    message: 'Bạn chưa nhập câu hỏi',
                    status: 'error'
                })
            );
            return;
        }
        if (answers.length < 2) {
            dispatch(
                openSnackBar({
                    message: 'Một câu hỏi phải có hơn 2 câu trả lời',
                    status: 'error'
                })
            );
            return;
        }

        if (Object.keys(matrix).length !== answers.length) {
            setMatrix(generateMatrix(answers.length));
        }
        setStep(1);
    };

    if (step) {
        return (
            <Grid container px={1.5} py={2}>
                <Grid container mb={2} direction="row" justifyContent="space-between">
                    <Grid item xs={7.5}>
                        <Typography variant="h5">Trọng số câu hỏi</Typography>
                    </Grid>
                </Grid>
                <Grid container mb={1} direction="row" justifyContent="space-between" px={5}>
                    <Slider
                        aria-label="Weight"
                        getAriaValueText={valueMatrix}
                        valueLabelDisplay="auto"
                        value={weight}
                        onChange={(e) => {
                            setWeight(e.target.value);
                        }}
                        step={0.1}
                        min={0}
                        max={1}
                    />
                </Grid>
                <Grid container mb={3} direction="row" justifyContent="space-between">
                    <Grid item xs={7.5}></Grid>
                </Grid>
                <Grid container mb={3} direction="row" justifyContent="space-between">
                    <Grid item xs={7.5}>
                        <Typography variant="h5">Trọng số câu trả lời</Typography>
                    </Grid>
                </Grid>
                <MatrixSelect matrix={matrix} setElement={setElement} />
                <Grid container justifyContent="space-between" mt={3}>
                    <Button onClick={() => setStep(0)}>Quay lại</Button>
                    <Button
                        onClick={() => {
                            console.log({
                                weight,
                                type,
                                answers,
                                question,
                                matrix
                            });
                            addItemForm({
                                weight,
                                type,
                                answers,
                                question,
                                matrix
                            });
                            setOpenDialog(false);
                        }}
                        variant="contained"
                    >
                        Tạo câu hỏi
                    </Button>
                </Grid>
            </Grid>
        );
    }

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
            <Grid container justifyContent="end" mt={3}>
                <Button onClick={nextStep}>Đặt trọng số</Button>
            </Grid>
        </Grid>
    );
};

export default CreateQA;
