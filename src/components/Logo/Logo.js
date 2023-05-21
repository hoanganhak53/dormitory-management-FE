// material-ui
import { Typography } from '@mui/material';
import logo from 'assets/images/logo.png';

import { styled } from '@mui/material/styles';

const LogoContainer = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`;

const Logo = ({ color }) => {
    return (
        <LogoContainer>
            <img src={logo} alt="Mantis" width="30" />
            <Typography color={color} sx={{ fontWeight: '700', pl: color ? '10px' : '0px' }}>
                Hust - KTX
            </Typography>
        </LogoContainer>
    );
};

export default Logo;
