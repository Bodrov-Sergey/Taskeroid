import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { history } from '@router';

import App from './app/App';
import './init';

render(
  <StrictMode>
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </StrictMode>,

  document.getElementById('root'),
);
