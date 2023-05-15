import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import PortalLayout from 'layout/PortalLayout/index';

const AuthPortal = Loadable(lazy(() => import('pages/portal/MainPortal')));

const PortalRoutes = {
    path: '/',
    element: <PortalLayout />,
    children: [
        {
            path: 'portal',
            element: <AuthPortal />
        }
    ]
};

export default PortalRoutes;
