import type { FC } from 'react';
import cx from 'classnames';

import { ReactComponent as Copy } from '@shared/assets/copy.svg';
interface Props {
  title: string;
  value: string;
  className?: string;
}

export const Field: FC<Props> = ({ title, value, className }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className={cx('flex flex-col space-y-2', className)}>
      <span className="text-sm leading-4">{title}</span>
      <span
        className="font-semibold flex items-center cursor-pointer"
        onClick={handleCopy}
      >
        {value} <Copy className="w-5 h-5 ml-2" />
      </span>
    </div>
  );
};
