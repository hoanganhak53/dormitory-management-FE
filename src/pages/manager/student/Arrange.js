import React from 'react';
import { Grid } from '@mui/material/index';
import { styled } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button, Divider, Typography } from '../../../../node_modules/@mui/material/index';
import { axiosInstance } from 'utils/auth-header';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const StatisticCard = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 49%;
    padding: 10px;
    background-color: #f2f2f2;
    margin-top: 10px;
    border-radius: 4px;
    .statistic-label {
        font-weight: bold;
    }

    .statistic-value {
        color: #888;
    }
`;

const Arrange = ({ result = [], statistic = {}, close }) => {
    const [expanded, setExpanded] = React.useState('panel0');
    const dispatch = useDispatch();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const submit = async () => {
        try {
            await axiosInstance.post('apartment/cluster/save', result).then(async (res) => {
                console.log(res.data.data);
                dispatch(
                    openSnackBar({
                        message: res?.data?.message,
                        status: 'success'
                    })
                );
                close();
            });
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: 'Sắp xếp bị lỗi, hãy thử lại sau',
                    status: 'error'
                })
            );
        }
    };

    return (
        <Grid container>
            <Grid container justifyContent="space-between" mb={2}>
                <StatisticCard>
                    <div className="statistic-label">Loại phòng:</div>
                    <div className="statistic-value">{statistic.room_type_name}</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Thời gian:</div>
                    <div className="statistic-value">{statistic.time} giây</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Phòng được sắp xếp:</div>
                    <div className="statistic-value">{statistic.room_num} phòng</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Đã sắp xếp:</div>
                    <div className="statistic-value">{statistic.student_num} sinh viên</div>
                </StatisticCard>
            </Grid>
            {result.length != 0 &&
                result.map((room, index) => {
                    return (
                        <Grid item key={index} xs={12}>
                            <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                <AccordionSummary
                                    expandIcon={<CaretDownOutlined />}
                                    aria-controls={`panel${index}bh-content`}
                                    id={`panel${index}bh-header`}
                                >
                                    <Typography>Phòng {room?.room_name || 'NA'}</Typography>
                                    <Typography sx={{ color: 'text.secondary', marginLeft: '10px' }}>
                                        {room?.students?.length} sinh viên
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingTop: '0px' }}>
                                    <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                                        Câu trả lời phổ biến
                                    </Typography>

                                    {room?.description &&
                                        room?.description.map((qa, qa_index) => (
                                            <Grid
                                                container
                                                key={`des${qa_index}`}
                                                alignItems="start"
                                                mb={1}
                                                pb={1}
                                                justifyContent="space-between"
                                                sx={{ borderBottom: '1px solid #ccc' }}
                                            >
                                                <Typography>{qa.question}</Typography>
                                                <Grid item container xs={6}>
                                                    {
                                                        <Typography sx={{ marginLeft: '5px', color: 'text.secondary' }}>
                                                            {qa?.answers.join(' - ')}
                                                        </Typography>
                                                    }
                                                </Grid>
                                            </Grid>
                                        ))}
                                    <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                                        Danh sách sinh viên
                                    </Typography>

                                    {room?.students &&
                                        room?.students.map((student, student_index) => (
                                            <Grid
                                                container
                                                key={`student${student_index}`}
                                                alignItems="start"
                                                mb={1}
                                                pb={1}
                                                justifyContent="space-between"
                                                sx={{ borderBottom: '1px solid #ccc' }}
                                            >
                                                <Typography>{student?.full_name}</Typography>
                                                <Typography sx={{ marginLeft: '5px', color: 'text.secondary' }}>{student?.mssv}</Typography>
                                            </Grid>
                                        ))}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    );
                })}
            <Grid container justifyContent="end" mt={2}>
                <Button onClick={submit}>Lưu danh sách</Button>
            </Grid>
        </Grid>
    );
};

export default Arrange;
