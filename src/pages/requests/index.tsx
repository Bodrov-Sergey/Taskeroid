import { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const ProjectsList = lazy(() => import('./ui/ProjectsList'));

const Requests = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} component={ProjectsList} exact />
    </Switch>
  );
};

export default Requests;
