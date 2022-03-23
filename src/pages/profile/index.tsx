import type { FC } from 'react';
import { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const UserProfile = lazy(() => import('./userProfile'));
const CompanyProfile = lazy(() => import('./companyProfile'));
const Employees = lazy(() => import('./employees'));

const Profile: FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={url} component={UserProfile} exact />
      <Route path={url + '/company'} component={CompanyProfile} exact />
      <Route path={url + '/employees'} component={Employees} exact />
    </Switch>
  );
};

export default Profile;
