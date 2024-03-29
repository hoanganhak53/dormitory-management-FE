import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom/dist/index';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const ForgotPassword = Loadable(lazy(() => import('pages/authentication/ForgotPassword')));

// ==============================|| AUTH ROUTING ||============================== //

const role = localStorage.getItem('role');

const LoginRoutes = {
    path: '/',
    element: role ? <Navigate to="/" /> : <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'forgot-password',
            element: <ForgotPassword />
        }
    ]
};

export default LoginRoutes;
