// material-ui
import { Typography } from '@mui/material';
import logo from 'assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    return (
        <>
            <img src={logo} alt="Mantis" width="30" />
            <Typography sx={{ fontWeight: '700' }}>Hust - KTX</Typography>
        </>
    );
};

export default Logo;
