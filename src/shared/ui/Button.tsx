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
    <button
      className={cx(
        'px-5 py-3 uppercase border border-transparent text-sm font-semibold leading-4 tracking-widest',
        {
          'text-white bg-gradient-to-r from-green to-green-dim':
            variant === 'primary',
          'border-green text-green': variant === 'outline',
          'border-white text-white !bg-transparent': variant === 'transparent',
        },
        className,
      )}
      style={props.disabled ? { cursor: 'initial', opacity: '0.7' } : {}}
      {...props}
    />
  );
};
