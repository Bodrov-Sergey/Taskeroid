import cx from 'classnames';
import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from 'react';

import { ReactComponent as Eye } from '@shared/assets/eye.svg';
import { ReactComponent as EyeClosed } from '@shared/assets/eye-closed.svg';

type Props = {
  label: string;
  disabled?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function toPhone(str: string) {
  const strippedValue = str.replace(/[^0-9]/g, '');
  const chars = strippedValue.split('');
  let count = 0;

  let formatted = '';

  for (const char of '+* (***) ***-****' as string) {
    if (chars[count]) {
      if (/\*/.test(char)) {
        formatted += chars[count];
        count++;
      } else {
        formatted += char;
      }
    }
  }

  return formatted;
}

const formattedValue =
  (onChange: (e: ChangeEvent<HTMLInputElement>) => void) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: toPhone(e.target.value),
      },
    });
  };

export const PasswordField: FC<Props> = ({
  label,
  className,
  type = 'text',
  onChange,
  disabled,
  autoComplete = 'on',
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <label className="text-sm leading-4 font-semibold">
      {label}
      <div className="relative">
        <input
          autoComplete={autoComplete}
          className={cx(
            'block mt-2 outline-none w-full border border-green-light h-11  pr-14 pl-4 text-dark text-base',
            className,
            {
              'bg-gray-light': disabled,
            },
            {
              '!border-green': focused,
            },
          )}
          type={passwordVisible ? 'text' : type}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e);
            setPasswordVisible(false);
          }}
          disabled={disabled}
          {...props}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        />
        <span
          className="absolute top-1/4 right-4 cursor-pointer"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? <Eye /> : <EyeClosed />}
        </span>
      </div>
    </label>
  );
};
