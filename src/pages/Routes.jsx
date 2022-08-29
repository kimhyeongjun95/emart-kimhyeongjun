import { Route, Routes as ReactRouterRoutes, } from 'react-router-dom';
import MainPage from './MainPage';

const Routes = () => {
    return (
        <ReactRouterRoutes>
            <Route path='/' element={<MainPage />} />
        </ReactRouterRoutes>
    )
}

export default Routes;