import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import PortalRoutes from './PortalRoutes';

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, LoginRoutes, PortalRoutes]);
}
