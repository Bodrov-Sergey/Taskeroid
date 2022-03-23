import cx from 'classnames';
import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useState,
  useEffect,
} from 'react';

import styles from './style.module.css';

type Props = {
  timeout?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Spinner: FC<Props> = ({ className, timeout = 1000, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsVisible(true), timeout);
    return () => clearTimeout(timeoutId);
  }, []);
  if (isVisible) {
    return <div className={cx(styles.spinner, className)} {...props} />;
  }
  return null;
};
