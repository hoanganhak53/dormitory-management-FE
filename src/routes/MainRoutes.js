import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { Navigate } from '../../node_modules/react-router-dom/dist/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - registration page
const RegistrationCurrent = Loadable(lazy(() => import('pages/registration/current/RegistrationCurrent')));
const RegistrationSemester = Loadable(lazy(() => import('pages/registration/semester/RegistrationSemester')));

// render - registration page
const AccountProfile = Loadable(lazy(() => import('pages/account/profile/AccountProfile')));
const AccountMore = Loadable(lazy(() => import('pages/account/more/AccountMore')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));

// ==============================|| MAIN ROUTING ||============================== //
const role = localStorage.getItem('role');

const MainRoutes = {
    path: '/',
    element: role ? <MainLayout /> : <Navigate to="/login" />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />,
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'registration',
            children: [
                {
                    path: 'semester',
                    element: <RegistrationSemester />
                },
                {
                    path: 'current',
                    element: <RegistrationCurrent />
                }
            ]
        },
        {
            path: 'profile',
            element: <AccountProfile />
        },
        {
            path: 'more',
            element: <AccountMore />
        },
        {
            path: 'typography',
            element: <Typography />
        }
    ]
};

//protected routes
switch (role) {
    case '1':
        MainRoutes.children.push({
            path: 'color',
            element: <Color />
        });
        break;
    case '2':
        break;
    case '3':
        break;
    default:
        break;
}

export default MainRoutes;
