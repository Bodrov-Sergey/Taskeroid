import type { FC } from 'react';

export const Table: FC = ({ children }) => {
  return <table className="text-left text-sm">{children}</table>;
};
