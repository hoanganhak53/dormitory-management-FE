// project import
import registration from './student/registration';
import dashboard from './student/dashboard';
import account from './student/account';
import fee from './student/fee';
import arrange from './manager/arrange';
import overview from './manager/overview';
import m_fee from './manager/m_fee';
import admin from './admin/dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    student: [dashboard, registration, fee, account],
    manager: [overview, arrange, m_fee],
    admin: [admin]
};

export default menuItems;
