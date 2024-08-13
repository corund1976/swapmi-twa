import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import RouteNames from 'router/routes';

import SharedLayout from 'components/sharedLayout';
import LoaderSpinner from 'components/loaderSpinner';

const Home = lazy(() => import('pages/home'));
const Game = lazy(() => import('pages/game'));
const Leaders = lazy(() => import('pages/leaders'));
const Friends = lazy(() => import('pages/inviteFriends'));
const About = lazy(() => import('pages/about'));

function Router() {
  const { pathname } = useLocation();

  const routes = (
    <Route element={<SharedLayout />}>
      <Route index element={<Home />} />
      <Route path={RouteNames.LEADERS} element={<Leaders />} />
      <Route path={RouteNames.GAME} element={<Game />} />
      <Route path={RouteNames.FRIENDS} element={<Friends />} />
      <Route path={RouteNames.ABOUT} element={<About />} />
      <Route path={RouteNames.ANY} element={<Navigate to="/" replace />} />
    </Route>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Routes>{routes}</Routes>
    </Suspense>
  );
}

export default Router;
