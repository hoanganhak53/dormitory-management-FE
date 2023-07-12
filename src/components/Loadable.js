import { Suspense } from 'react';

// project import
import Loader from './Loader';

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
