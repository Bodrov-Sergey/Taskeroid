import classNames from 'classnames';
import cx from 'classnames';
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

type Props = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Radio: FC<Props> = ({ className, label, ...props }) => {
  return (
    <div className={cx('flex items-center', className)}>
      <label
        className={classNames(
          styles.label,
          'inline-flex items-center relative pl-8 cursor-pointer select-none',
          {
            'cursor-default': props.disabled,
          },
        )}
      >
        <input className={classNames(styles.radio)} type="radio" {...props} />
        <span
          className={cx(styles.checkmark, { 'bg-gray-light': props.disabled })}
        />
        {label}
      </label>
    </div>
  );
};
