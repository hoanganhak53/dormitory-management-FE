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

const Distribute = ({ result = [], statistic = {}, close }) => {
    const [expanded, setExpanded] = React.useState('panel0');
    const dispatch = useDispatch();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const submit = async () => {
        try {
            await axiosInstance.put('room/distribute', result).then(async (res) => {
                dispatch(
                    openSnackBar({
                        message: res?.data?.message,
                        status: 'success'
                    })
                );
                close();
                window.location.reload();
            });
        } catch (err) {
            dispatch(
                openSnackBar({
                    message: 'Dồn phòng bị lỗi, hãy thử lại sau',
                    status: 'error'
                })
            );
        }
    };

    return (
        <Grid container>
            <Grid container justifyContent="space-between" mb={2}>
                <StatisticCard>
                    <div className="statistic-label">Phòng đã dồn:</div>
                    <div className="statistic-value">{statistic.num_distributed} phòng</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Phòng trống tạo ra:</div>
                    <div className="statistic-value">{statistic.num_empty} phòng</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Phòng mới:</div>
                    <div className="statistic-value">{statistic.new_rooms} phòng</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Đã sắp xếp:</div>
                    <div className="statistic-value">{statistic.total_student} sinh viên</div>
                </StatisticCard>
            </Grid>
            {result.length != 0 &&
                result.map((new_room, index) => {
                    if (!new_room instanceof Array) {
                        return <></>;
                    }
                    const target_room = new_room[0] || {};
                    const total_student = new_room.reduce((accumulator, currentObject) => {
                        return accumulator + currentObject.student_num;
                    }, 0);

                    return (
                        <Grid item key={index} xs={12}>
                            <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                <AccordionSummary
                                    expandIcon={<CaretDownOutlined />}
                                    aria-controls={`panel${index}bh-content`}
                                    id={`panel${index}bh-header`}
                                >
                                    <Typography>Phòng {target_room?.room_name || ''}</Typography>
                                    <Typography sx={{ color: 'text.secondary', marginLeft: '10px' }}>{total_student} sinh viên</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingTop: '0px' }}>
                                    {new_room.map((item, room_index) => {
                                        if (!new_room instanceof Array) {
                                            return <></>;
                                        }
                                        return (
                                            <Grid key={`room${room_index}`}>
                                                {item.students.map((student, student_index) => (
                                                    <Grid
                                                        container
                                                        key={`student${student_index}`}
                                                        alignItems="start"
                                                        mb={1}
                                                        justifyContent="space-between"
                                                        sx={{ borderBottom: '1px solid #ccc' }}
                                                    >
                                                        <Grid>
                                                            <Typography>{student?.full_name}</Typography>
                                                            <Typography
                                                                sx={{ marginLeft: '5px', color: 'text.secondary', fontSize: '13px' }}
                                                            >
                                                                {student?.mssv}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography
                                                                color={item?.room_name != target_room?.room_name ? 'success.main' : 'gray'}
                                                            >
                                                                Phòng {item?.room_name}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        );
                                    })}
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

export default Distribute;
