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
  const { url } = useRouteMatch();

  return (
    <>
      <>
        <div className="flex justify-between items-center mb-5">
          <h1>Входящие</h1>
        </div>
        {/* unwatched/completed/watched/my/not_my/accepted/not_accepted */}
        <div className="flex items-center flex-wrap mb-2">
          <Tab className="mb-4 ml-[-1px]" to={`${url}/unwatched`}>
            Непросмотренные
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/completed`}>
            Завершенные
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/watched`}>
            Просмотренные
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/my`}>
            Я ответственный
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/not_my`}>
            Не я ответственный
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/accepted`}>
            Принятые
          </Tab>
          <Tab className="mb-4 ml-[-1px]" to={`${url}/not_accepted`}>
            Непринятые
          </Tab>
        </div>
      </>
    </>
  );
};

export default Main;
