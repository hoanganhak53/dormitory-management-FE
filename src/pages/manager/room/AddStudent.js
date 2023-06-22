import React, { useState } from 'react';
import { Button, Grid, Typography } from '../../../../node_modules/@mui/material/index';
import { styled } from '@mui/material/styles';
import { axiosInstance } from 'utils/auth-header';
import { formatMajor } from 'utils/fomat';
import { useDispatch } from '../../../../node_modules/react-redux/es/exports';
import { openSnackBar } from 'store/reducers/menu';

const StudentCard = styled(Grid)`
    padding: 4px;
    border-bottom: 1px solid #f0f0f0;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const AddStudent = ({ room_id, apartment_id, room_type_id, close }) => {
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();
    React.useEffect(() => {
        const init = async () => {
            try {
                const body = {
                    apartment_id,
                    room_type_id
                };
                await axiosInstance.post(`student/no_room`, body).then((res) => {
                    setStudents(res.data.data);
                });
            } catch (err) {}
        };

        return init;
    }, []);

    if (students.length == 0) {
        return (
            <Typography variant="h5" sx={{ textAlign: 'center' }} py={5}>
                Không có dữ liệu
            </Typography>
        );
    }

    const addToRoom = async (e) => {
        try {
            const body = {
                user_id: e?.student?.id,
                student_room_id: e.id,
                room_id: room_id
            };
            await axiosInstance.post(`student/add_to_room`, body).then((res) => {
                close();
                dispatch(
                    openSnackBar({
                        message: res.data?.message,
                        status: 'success'
                    })
                );
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Grid container mb={2}>
            {students.map((e) => (
                <StudentCard container key={e.id} alignItems="center">
                    <Grid item xs={3.2}>
                        {e?.student?.full_name}
                    </Grid>
                    <Grid item xs={1.5}>
                        {e?.student?.birth}
                    </Grid>
                    <Grid item xs={3.2}>
                        <Typography sx={{ overflow: 'hidden', whiteSpace: 'space' }}>{formatMajor(e?.student?.major)}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        K{e?.student?.batch}
                    </Grid>
                    <Grid item xs={2}>
                        {e?.student?.phonenumber}
                    </Grid>
                    <Grid item xs={0.6}>
                        <Button onClick={() => addToRoom(e)}>Thêm</Button>
                    </Grid>
                </StudentCard>
            ))}
        </Grid>
    );
};

export default AddStudent;
