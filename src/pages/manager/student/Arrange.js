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
import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
// third-party
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

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

const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

const Arrange = ({ result = [], statistic = {}, close }) => {
    const [expanded, setExpanded] = React.useState('panel0');
    const dispatch = useDispatch();

    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories: Array.from(Array(statistic.loss.length).keys()).map((x) => x + 1),
                labels: {
                    style: {
                        colors: [secondary]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: statistic.loss.length
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [primary, secondary, line, theme]);

    const series = [
        {
            name: 'Loop',
            data: statistic.loss.map((e) => e.toFixed(6))
        }
    ];

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
                <StatisticCard>
                    <div className="statistic-label">Số vòng lặp tối đa:</div>
                    <div className="statistic-value">{statistic.max_loop} vòng</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Hệ số mờ:</div>
                    <div className="statistic-value">{statistic.fuzzy_m}</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Số vòng lắp:</div>
                    <div className="statistic-value">{statistic.loop} vòng</div>
                </StatisticCard>
                <StatisticCard>
                    <div className="statistic-label">Epsilon:</div>
                    <div className="statistic-value">{statistic.epsilon}</div>
                </StatisticCard>
            </Grid>
            <Grid item xs={12} mb={3}>
                <ReactApexChart options={options} series={series} type="area" height={450} />
                <Typography sx={{ width: '100%', textAlign: 'center', fontWeight: '600' }}>Đồ thị hàm lỗi</Typography>
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
