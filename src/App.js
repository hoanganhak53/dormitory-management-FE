// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDFVNWoFElQIwnpQf5NRgBpQmh_mR7Q27w',
    authDomain: 'prj3-371008.firebaseapp.com',
    projectId: 'prj3-371008',
    storageBucket: 'prj3-371008.appspot.com',
    messagingSenderId: '205258461086',
    appId: '1:205258461086:web:993e463c1cc422c6c3908f'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const App = () => {
    return (
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    );
};

export default App;
