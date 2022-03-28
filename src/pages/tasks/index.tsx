import { FC, lazy } from 'react';
import { useRouteMatch, Switch, Route, useLocation } from 'react-router-dom';
// import { ReactComponent as DownloadIcon } from '@shared/assets/download.svg';
import { Urls } from '@router';

import { Tab } from '@shared/ui';

const Documents: FC = () => {
  const { pathname } = useLocation();
  const { url, path } = useRouteMatch();
  return (
    <div className="pb-[50px]">
      <>
        <div className="flex items-center justify-between mb-5">
          <h1>Задачи</h1>
        </div>
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
    </div>
  );
};

export default Documents;
