import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';

// project import
import HeaderContent from './HeaderContent';

const Header = () => {
    const theme = useTheme();

    const mainHeader = (
        <Toolbar>
            <HeaderContent />
        </Toolbar>
    );

    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            pl: '10%',
            pr: '10%'
        }
    };

    return (
        <>
            <AppBar open={true} {...appBar}>
                {mainHeader}
            </AppBar>
        </>
    );
};

Header.propTypes = {
    open: PropTypes.bool
};

export default Header;
