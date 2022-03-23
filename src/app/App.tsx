import type { FC } from 'react';
import { Suspense } from 'react';
import { useStore } from 'effector-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authenticateFx } from '@shared/model';

import { Routes, Layout } from './ui';
import './globals.css';
import { Spinner } from '@shared/ui';

const App: FC = () => {
  const isLoading = useStore(authenticateFx.pending);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner />
          </div>
        }
      >
        <Routes />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Suspense>
    </Layout>
  );
};

export default App;
