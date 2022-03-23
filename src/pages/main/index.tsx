import { lazy, FC } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  NavLink,
} from 'react-router-dom';
import { Tab } from '@shared/ui';

import { ReactComponent as Arrow } from '@shared/assets/arrow-right.svg';

const Main: FC = () => {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <>
      <>
        <div className="flex justify-between items-center mb-5">
          <h1>Входящие</h1>
        </div>
        <div className="flex items-center flex-wrap mb-2">
          <Tab className="mb-4 ml-[-1px]" to={`${url}/analytics`}>
            Аналитика
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/reports`}>
            Отчёты
          </Tab>
        </div>
      </>
    </>
  );
};

export default Main;
