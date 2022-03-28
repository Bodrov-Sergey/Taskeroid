import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStore } from 'effector-react';
import { $auth } from '@shared/model';
import { Redirect, Route, RouteProps } from 'react-router';
import { Urls } from '@router';

const PrivateRoute: FC<RouteProps> = props => {
  const { user } = useStore($auth);

  return user ? <Route {...props} /> : <Redirect to={Urls.LOGIN} />;
};

export default PrivateRoute;
