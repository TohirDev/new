import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
// import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DisplayingInformation from './pages/InformationPage';
import VacationPage from './pages/VacationPage';
import SchoolPage from './pages/SchoolPage';
import MahallaPage from './pages/MahallaPage';
import MurojatlarPage from './pages/MurojatlarPage';
import JPS from './sections/@dashboard/jps/jps';
import QilinganIshlarPage from './pages/QilinganIshlarPage';
import OquvchilarBalansi from './sections/@dashboard/oquvchilarBalansi/oquvchilarBalansi';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'information', element: <DisplayingInformation /> },
        { path: 'tatil_varaqa', element: <VacationPage /> },
        { path: 'maktab', element: <SchoolPage /> },
        { path: 'mahalla', element: <MahallaPage /> },
        { path: 'murojat', element: <MurojatlarPage /> },
        { path: 'ishlar', element: <QilinganIshlarPage /> },
        { path: 'jps', element: <JPS /> },
        { path: 'balans', element: <OquvchilarBalansi /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
