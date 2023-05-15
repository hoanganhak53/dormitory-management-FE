// project import
import registration from './student/registration';
import dashboard from './student/dashboard';
import account from './student/account';
import fee from './student/fee';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    student: [dashboard, registration, fee, account],
    manager: [dashboard],
    admin: [dashboard]
};

export default menuItems;
