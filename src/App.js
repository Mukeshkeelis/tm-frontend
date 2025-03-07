import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { setMiniSidenav, useMaterialUIController } from './context';
import { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './assest/theme';
import routes from './routes';
import Sidenav from './layoutcontainers/DashboardLayout/components/Sidebar';
import logo from '../src/assest/images/logo.png'
import ProtectedRoute from './pages/authentication/ProtectedRoute';
import Signin from './pages/authentication/signin';
import Loader from './components/Loader';
import Popup from './components/Popup';

function App() {

  const [controller] = useMaterialUIController();
  // const { miniSidenav, direction, layout, sidenavColor } = controller
  const { loading } = controller;
  // const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   document.body.setAttribute("dir", direction);
  // }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const permission = sessionStorage.getItem('permission')

  const getRoutes = (allRoutes) =>{

    let filteredRoutes = permission ? allRoutes.filter(route=>route.allowedRoles?.includes(permission)) : allRoutes.slice(0)
    
    let routeComponent = filteredRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route === '/sign-in') {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      else{
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
    })

    return routeComponent
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loader open={loading}/>
      <Popup/>
        <Routes>
          <Route path='/' element={<Navigate to={'/dashboard'}/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route element={<ProtectedRoute/>}>
           {getRoutes(routes)}
          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;
