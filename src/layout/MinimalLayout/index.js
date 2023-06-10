import { Outlet } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material/index';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackBar } from 'store/reducers/menu';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu);
    const { snackBar } = menu;

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackBar());
    };

    return (
        <>
            <Outlet />
            <Snackbar open={snackBar.open} autoHideDuration={4000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity={snackBar.status} sx={{ width: '100%' }}>
                    {snackBar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default MinimalLayout;
