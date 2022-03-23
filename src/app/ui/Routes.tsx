import type { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Urls, PrivateRoute } from '@router';
import { lazy } from 'react';

const routes = [
  {
    path: Urls.SIGNUP,
    component: lazy(() => import('@pages/signUp')),
  },

  {
    path: Urls.LOGIN,
    component: lazy(() => import('@pages/login')),
  },
  {
    path: Urls.TASKS,
    component: lazy(() => import('@pages/tasks')),
    private: true,
  },
  {
    path: Urls.PROJECTS,
    component: lazy(() => import('@pages/requests')),
    private: true,
  },
  {
    path: Urls.PROFILE,
    component: lazy(() => import('@pages/profile')),
    private: true,
  },
  {
    path: Urls.MAIN,
    component: lazy(() => import('@pages/main')),
    private: true,
  },
  {
    path: '/',
    component: lazy(() => import('@pages/index')),
    exact: true,
  },
];

export const Routes: FC = () => {
  return (
    <Switch>
      {routes.map(route =>
        route.private ? (
          <PrivateRoute
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ) : (
          <Route
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ),
      )}
    </Switch>
  );
};
