import cx from 'classnames';
import { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const Tab: FC<NavLinkProps> = ({
  className,
  activeClassName,
  ...props
}) => {
  return (
    <NavLink
      className={cx(
        'text-sm leading-4 font-semibold uppercase text-green tracking-widest px-5 py-3 border border-green-light',
        className,
      )}
      activeClassName={cx('bg-teal', activeClassName)}
      {...props}
    />
  );
};
