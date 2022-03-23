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
          <Tab className="mb-4 -ml-px" to={`${url}/contractors`}>
            Договоры с контрагентами
          </Tab>
          <Tab className="mb-4 -ml-px" to={`${url}/legal`}>
            Юридические документы
          </Tab>
          <Tab className="mb-4 -ml-px" to={`${url}/finance`}>
            Финансовые документы
          </Tab>
          <Tab className="mb-4 -ml-px" to={`${url}/other`}>
            Прочие документы
          </Tab>
          <Tab className="mb-4 -ml-px" to={`${url}/smartfact`}>
            Документы от Smartfact
          </Tab>
        </div>
      </>
    </div>
  );
};

export default Documents;
