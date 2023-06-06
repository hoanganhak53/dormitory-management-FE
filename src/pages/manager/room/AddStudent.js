import React from 'react';
import { Button, Grid } from '../../../../node_modules/@mui/material/index';
import { styled } from '@mui/material/styles';

const StudentCard = styled(Grid)`
    padding: 4px;
    border-bottom: 1px solid #f0f0f0;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const AddStudent = () => {
    const generateData = (count) => {
        const data = [];
        for (let i = 1; i <= count; i++) {
            data.push({
                id: i,
                column1: `Nguyễn Duy Hoàng Anh ${i}`,
                column3: `2019${i % 10}123`,
                column4: `Khoa học máy tính`,
                column5: `092341232${i % 10}`
            });
        }
        return data;
    };
    const data = generateData(10);

    return (
        <Grid container mb={2}>
            {data.map((e) => (
                <StudentCard container key={e.id} alignItems="center">
                    <Grid item xs={5}>
                        {e.column1}
                    </Grid>

                    <Grid item xs={1.5}>
                        {e.column3}
                    </Grid>
                    <Grid item xs={4.5}>
                        {e.column4}
                    </Grid>
                    <Grid item xs={1}>
                        <Button>Thêm</Button>
                    </Grid>
                </StudentCard>
            ))}
        </Grid>
    );
};

export default AddStudent;
