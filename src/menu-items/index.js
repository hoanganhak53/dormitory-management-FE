// project import
import registration from './student/registration';
import dashboard from './student/dashboard';
import account from './student/account';
import admin from './admin/dashboard';
import manager from './manager/index';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    student: [dashboard, registration, account],
    manager: [manager],
    admin: [admin]
};

export default menuItems;
