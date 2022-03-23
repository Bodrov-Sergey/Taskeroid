import { FC } from 'react';

import { Header, Sidebar } from '..';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="xl:p-10 p-5 flex flex-col">{children}</main>
    </>
  );
};
