import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup } from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { Checkbox, Typography } from '@mui/material/index';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from 'react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

export const AccountMore = () => {
    const [form, setForm] = useState([]);
    const [answers, setAnswers] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const init = async () => {
            try {
                await axiosInstance.get('form/list').then(async (res) => {
                    setForm(res.data.data);
                    const rs = {};
                    res.data.data.map((e) => {
                        rs[e.id] = {
                            answer: [],
                            answer_type: e.form_type
                        };
                    });
                    setAnswers(rs);
                });
            } catch (err) {}
        };

        return init;
    }, []);

    const handleChange = (change, id) => {
        const value = change * 1;

        let q = answers[id];
        if (q.answer_type == 1) {
            let a = [...q.answer];
            if (a.includes(value)) {
                a = a.filter((e) => e != value);
            } else {
                a.push(value);
            }
            q.answer = [...a];
        } else {
            q.answer = [value];
        }
        setAnswers((prev) => {
            const rs = { ...prev };
            rs[id] = q;
            return rs;
        });
    };

    const checkResult = () => {
        let check = true;
        Object.keys(answers).map((e) => {
            const value = answers[e];
            if (value.answer.length == 0) {
                dispatch(
                    openSnackBar({
                        message: 'Hãy điền trả lời tất cả các câu hỏi',
                        status: 'error'
                    })
                );
                check = false;
                return false;
            }
        });

        return check;
    };

    const submit = async () => {
        if (!checkResult()) return;

        try {
            await axiosInstance
                .put('profile/change', {
                    answers
                })
                .then((res) => {
                    dispatch(
                        openSnackBar({
                            message: 'Điền câu trả lời thành công',
                            status: 'success'
                        })
                    );
                });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Grid container rowSpacing={2.5} columnSpacing={2.75} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5">Sửa thông tin bổ sung</Typography>
                    <Typography variant="h6" color={true ? 'error' : 'success'}>
                        {true ? 'Chưa xác thực' : 'Đã xác thực'}
                    </Typography>
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
                                            key={option + i}
                                            value={i}
                                            control={e.form_type == 1 ? <Checkbox /> : <Radio />}
                                            label={option}
                                            onChange={(event) => handleChange(event.target.value, e.id)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </MainCard>
                    </Grid>
                ))}
                <Grid container justifyContent="center" mt={2}>
                    <AnimateButton>
                        <Button disableElevation size="small" type="submit" variant="contained" color="primary" onClick={submit}>
                            Chỉnh sửa
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </>
    );
};

export default AccountMore;
