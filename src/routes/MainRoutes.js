import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom/dist/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/student/dashboard')));

// render - registration page
const RegistrationCurrent = Loadable(lazy(() => import('pages/student/registration/current/RegistrationCurrent')));
const RegistrationSemester = Loadable(lazy(() => import('pages/student/registration/semester/RegistrationSemester')));

// render - account page
const AccountProfile = Loadable(lazy(() => import('pages/student/account/profile/AccountProfile')));
const AccountMore = Loadable(lazy(() => import('pages/student/account/more/AccountMore')));

// render - fee page
const FeeRoom = Loadable(lazy(() => import('pages/student/fee/room/FeeRoom')));
const FeeService = Loadable(lazy(() => import('pages/student/fee/service/FeeService')));

const RoomList = Loadable(lazy(() => import('pages/manager/room/RoomList')));
const ManagerStudent = Loadable(lazy(() => import('pages/manager/student/ManagerStudent')));

const AdminForm = Loadable(lazy(() => import('pages/admin/form/AdminForm')));
const Student = Loadable(lazy(() => import('pages/admin/student/Student')));
const AdminPost = Loadable(lazy(() => import('pages/admin/post/AdminPost')));
const Apartment = Loadable(lazy(() => import('pages/admin/apartment/Apartment')));
const ARegistration = Loadable(lazy(() => import('pages/admin/a_registration/ARegistration')));

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
            path: 'fee',
            children: [
                {
                    path: 'service',
                    element: <FeeService />
                },
                {
                    path: 'room',
                    element: <FeeRoom />
                }
            ]
        },
        {
            path: 'profile',
            element: <AccountProfile />
        },
        {
            path: 'student',
            element: <Student />
        },
        {
            path: 'post',
            element: <AdminPost />
        },
        {
            path: 'more',
            element: <AccountMore />
        },
        {
            path: 'apartment',
            element: <Apartment />
        },
        {
            path: 'a_registration',
            element: <ARegistration />
        },
        {
            path: 'form',
            element: <AdminForm />
        },
        {
            path: 'student-manager',
            element: <ManagerStudent />
        },
        {
            path: 'room-manager',
            element: <RoomList />
        }
    ]
};

//protected routes
switch (role) {
    case '1':
        MainRoutes.children.push({
            path: 'color',
            element: <></>
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
