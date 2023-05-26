import MainCard from 'components/MainCard';
import React from 'react';

// material-ui
import { Button, FormHelperText, Grid, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup } from '@mui/material';

import { InfoCircleOutlined } from '@ant-design/icons';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { Checkbox, FormGroup, TextField, Typography } from '@mui/material/index';
import { characters, desires, favorites, sleep_times, time_in_ktxs } from 'constanst/more';
import CustomDialog from 'components/CustomDialog';
import CreateQA from './CreateQA';

export const AdminForm = () => {
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    is_smoking: '',
                    sleep_time: '',
                    time_in_ktx: '',
                    favorite: '',
                    character: '',
                    describe: '',
                    desire: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    is_smoking: Yup.string().required('Đây là câu hỏi bắt buộc'),
                    sleep_time: Yup.string().required('Đây là câu hỏi bắt buộc'),
                    time_in_ktx: Yup.string().required('Đây là câu hỏi bắt buộc'),
                    describe: Yup.string().required('Đây là câu hỏi bắt buộc'),
                    favorite: Yup.array().required('Đây là câu hỏi bắt buộc'),
                    character: Yup.array().required('Đây là câu hỏi bắt buộc'),
                    desire: Yup.array().required('Đây là câu hỏi bắt buộc')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                    console.log(values);
                }}
            >
                {({ errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container rowSpacing={2.5} columnSpacing={2.75} alignItems="center" justifyContent="center" mt={2}>
                            <Grid container alignItems="center" justifyContent="space-between" ml={6}>
                                <Grid item>
                                    <Typography variant="h5">Biểu mẫu thông tin bổ sung</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="container" color="primary.main" onClick={() => setOpenDialog(true)}>
                                        Tạo câu hỏi
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.time_in_ktx && errors.time_in_ktx ? '#f5222d' : ''}>
                                    <FormControl>
                                        <FormLabel id="time_in_ktx">
                                            Thời gian dự định ở ký túc xá
                                            <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="time_in_ktx"
                                            value={values.time_in_ktx}
                                            name="time_in_ktx"
                                            onChange={handleChange}
                                        >
                                            {time_in_ktxs.map((option) => (
                                                <FormControlLabel
                                                    disabled
                                                    key={option.value}
                                                    value={option.value}
                                                    name="time_in_ktx"
                                                    control={<Radio />}
                                                    label={option.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    {touched.time_in_ktx && errors.time_in_ktx && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.time_in_ktx}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.is_smoking && errors.is_smoking ? '#f5222d' : ''}>
                                    <FormControl>
                                        <FormLabel id="is_smoking">
                                            Bạn có hút thuốc không?
                                            <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="is_smoking"
                                            value={values.is_smoking}
                                            name="is_smoking"
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel name="is_smoking" value="1" control={<Radio disabled />} label="Có" />
                                            <FormControlLabel name="is_smoking" value="0" control={<Radio disabled />} label="Không" />
                                        </RadioGroup>
                                    </FormControl>
                                    {touched.is_smoking && errors.is_smoking && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.is_smoking}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.sleep_time && errors.sleep_time ? '#f5222d' : ''}>
                                    <FormControl>
                                        <FormLabel id="sleep_time">
                                            Khoảng thời gian ngủ
                                            <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-labelledby="sleep_time"
                                            value={values.sleep_time}
                                            name="sleep_time"
                                            onChange={handleChange}
                                        >
                                            {sleep_times.map((option) => (
                                                <FormControlLabel
                                                    disabled
                                                    name="sleep_time"
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Radio />}
                                                    label={option.label}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    {touched.sleep_time && errors.sleep_time && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.sleep_time}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.favorite && errors.favorite ? '#f5222d' : ''}>
                                    <FormControl>
                                        <FormLabel id="favorite-label">
                                            Sở thích
                                            <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                        </FormLabel>
                                        <FormGroup
                                            aria-labelledby="favorite"
                                            value={values.favorite}
                                            name="favorite"
                                            onChange={handleChange}
                                            id="favorite"
                                        >
                                            {favorites.map((option) => (
                                                <FormControlLabel
                                                    disabled
                                                    id={`favorite-${option.value}`}
                                                    name="favorite"
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Checkbox />}
                                                    label={option.label}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                    {touched.favorite && errors.favorite && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.favorite}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.character && errors.character ? '#f5222d' : ''}>
                                    <FormControl>
                                        <FormLabel id="character-label">
                                            Sở thích
                                            <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                        </FormLabel>
                                        <FormGroup
                                            aria-labelledby="character"
                                            value={values.character}
                                            name="character"
                                            onChange={handleChange}
                                            id="character"
                                        >
                                            {characters.map((option) => (
                                                <FormControlLabel
                                                    disabled
                                                    id={`character-${option.value}`}
                                                    name="character"
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Checkbox />}
                                                    label={option.label}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                    {touched.character && errors.character && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.character}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.desire && errors.desire ? '#f5222d' : ''}>
                                    <FormControl>
                                        <FormLabel id="desire-label">
                                            Mong muốn bạn cùng phòng như thế nào?
                                            <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                        </FormLabel>
                                        <FormGroup
                                            aria-labelledby="desire"
                                            value={values.desire}
                                            name="desire"
                                            onChange={handleChange}
                                            id="desire"
                                        >
                                            {desires.map((option) => (
                                                <FormControlLabel
                                                    disabled
                                                    id={`desire-${option.value}`}
                                                    name="desire"
                                                    key={option.value}
                                                    value={option.value}
                                                    control={<Checkbox />}
                                                    label={option.label}
                                                />
                                            ))}
                                        </FormGroup>
                                    </FormControl>
                                    {touched.desire && errors.desire && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.desire}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            <Grid item xs={7}>
                                <MainCard borderColor={touched.describe && errors.describe ? '#f5222d' : ''}>
                                    <FormLabel id="describe">
                                        Giới thiệu ngắn gọn
                                        <span style={{ color: 'red', fontSize: '18px' }}> *</span>
                                    </FormLabel>
                                    <TextField
                                        id="describe"
                                        type="text"
                                        value={values.describe}
                                        name="describe"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Câu trả lời của bạn"
                                        fullWidth
                                        variant="standard"
                                        sx={{ marginTop: '10px', marginBottom: '20px' }}
                                        disabled
                                    />
                                    {touched.describe && errors.describe && (
                                        <FormHelperText error>
                                            <InfoCircleOutlined />
                                            &ensp;
                                            {errors.describe}
                                        </FormHelperText>
                                    )}
                                </MainCard>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid container justifyContent="center" mt={2}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        size="small"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Lưu biểu mẫu
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <CustomDialog
                title="Tạo câu hỏi"
                width="sm"
                bodyComponent={<CreateQA />}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </>
    );
};

export default AdminForm;
