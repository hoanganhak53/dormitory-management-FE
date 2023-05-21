import { Dialog, DialogContent, DialogActions, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const Header = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 6px 18px;
    background: ${(props) => props.theme.palette.primary.main};
    color: white;
`;

const Title = styled(Typography)`
    margin-right: ${(props) => props.theme.spacing(2)};
    font-size: 16px;
    font-weight: 600;
`;

//width: xs, sm, md, lg, xl
const CustomDialog = ({ open, title, bodyComponent, width = 'xs', onClose, actionComponent }) => {
    return (
        <Dialog open={open} fullWidth={true} maxWidth={width} onClose={onClose}>
            <Header>
                <Title variant="h5">{title}</Title>
                <IconButton edge="end" sx={{ color: '#ffffff' }} onClick={onClose} aria-label="close">
                    <CloseOutlined />
                </IconButton>
            </Header>
            <DialogContent>{bodyComponent}</DialogContent>
            {actionComponent && <DialogActions>{actionComponent}</DialogActions>}
        </Dialog>
    );
};

CustomDialog.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    bodyComponent: PropTypes.node,
    width: PropTypes.string,
    onClose: PropTypes.func,
    actionComponent: PropTypes.node
};

export default CustomDialog;
