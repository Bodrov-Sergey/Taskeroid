import type { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Index: FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  if (pathname == '/') {
    history.replace('/main');
  }

  return <></>;
};

export default Index;
