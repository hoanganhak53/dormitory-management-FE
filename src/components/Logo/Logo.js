// material-ui
import { Typography } from '@mui/material';
import logo from 'assets/images/logo.png';

const Logo = ({ color }) => {
    return (
        <>
            <img src={logo} alt="Mantis" width="30" />
            <Typography color={color} sx={{ fontWeight: '700', pl: color ? '10px' : '0px' }}>
                Hust - KTX
            </Typography>
        </>
    );
};

export default Logo;
