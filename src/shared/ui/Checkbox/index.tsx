import classNames from 'classnames';
import cx from 'classnames';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

import { ReactComponent as CheckMark } from '@shared/assets/check-mark.svg';

type Props = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Checkbox: FC<Props> = ({ className, label, ...props }) => {
  return (
    <div className={cx('flex items-center', className)}>
      <label
        className={classNames(
          styles.label,
          'inline-flex cursor-pointer relative pl-8 cursor-pointer select-none',
        )}
      >
        <input
          className={classNames(styles.checkbox)}
          type="checkbox"
          {...props}
        />
        <span className={styles.checkmark}>
          <CheckMark />
        </span>

        {label}
      </label>
    </div>
  );
};
