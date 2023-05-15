import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store } from 'store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const role = localStorage.getItem('role');
let basename = '';
switch (role) {
    case '1':
        basename = 'student';
        break;
    case '2':
        basename = 'manager';
        break;
    case '3':
        basename = 'admin';
        break;
    default:
        basename = 'student';
        break;
}

root.render(
    <StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter basename={`/${basename}`}>
                <App />
            </BrowserRouter>
        </ReduxProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
