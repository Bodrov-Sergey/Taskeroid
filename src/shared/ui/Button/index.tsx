import styles from './styles.module.scss';
import cx from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

type Props = {
  variant?: 'primary' | 'outline' | 'transparent';
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<Props> = ({
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button className={cx(className, styles.wrapper)} onClick={props.onClick}>
      <button className={styles.button}>{props.children}</button>
      <div className={styles.background}></div>
      <div className={styles.backgroundHover}></div>
    </button>
  );
};
