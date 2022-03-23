import cx from 'classnames';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from 'react';

type ChangeHandler = (args: { key: string; value: string }) => void;

type Props = {
  label?: string;
  mask?: 'fullName' | 'money' | 'phone' | 'number';
  type?: 'text' | 'email' | 'password' | 'tel';
  onChange: ChangeHandler;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'onChange'
>;

function toPhone(str: string) {
  const strippedValue = str.replace(/[^0-9]/g, '');
  const chars = strippedValue.split('');
  let count = 0;

  let formatted = '';

  for (const char of '+* (***) ***-****' as string) {
    if (chars[count]) {
      if (/\*/.test(char)) {
        if (chars.length == 1) {
          if (chars[0] == '8' || chars[0] == '7') {
            formatted += '7';
          } else {
            formatted += '7';
            formatted += ' (';
            formatted += chars[count];
          }
        } else formatted += chars[count];
        count++;
      } else {
        formatted += char;
      }
    }
  }

  return formatted;
}

function toMoney(str: string) {
  const strippedValue = str.replace(/[^0-9]/g, '');
  const chars = strippedValue.split('').reverse();
  let count = 0;

  let formatted: string | string[] = '';

  for (const char of '*** *** *** *** *** *** ***' as string) {
    if (chars[count]) {
      if (/\*/.test(char)) {
        formatted += chars[count];
        count++;
      } else {
        formatted += char;
      }
    }
  }

  return formatted.split('').reverse().join('');
}
function toNumber(str: string) {
  const strippedValue = str.replace(/[^0-9]/g, '');
  const chars = strippedValue.split('');
  let count = 0;

  let formatted: string | string[] = '';

  for (const char of '*********************' as string) {
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

function toFullName(str: string) {
  return str
    .split(' ')
    .map(part =>
      part === '' ? part : `${part[0].toUpperCase()}${part.slice(1)}`,
    )
    .join(' ');
}

function formatted(
  onChange: ChangeHandler,
  formater: (str: string) => string,
): ChangeEventHandler<HTMLInputElement> {
  return e => {
    onChange({
      key: e.target.name,
      value: formater(e.target.value),
    });
  };
}

export const TextField: FC<Props> = ({
  className,
  label,
  type = 'text',
  mask,
  onChange,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const computedClassName = cx(
    'block outline-none w-full border border-green-light h-11 px-4 text-dark text-base',
    className,
    {
      'bg-gray-light': props.disabled,
    },
    {
      '!border-green': focused,
    },
  );

  let handleChange: ChangeEventHandler<HTMLInputElement> = e =>
    onChange({ key: e.target.name, value: e.target.value });

  if (onChange) {
    switch (mask) {
      case 'fullName':
        handleChange = formatted(onChange, toFullName);
        break;
      case 'money':
        handleChange = formatted(onChange, toMoney);
        break;
      case 'number':
        handleChange = formatted(onChange, toNumber);
        break;
      case 'phone':
        handleChange = formatted(onChange, toPhone);
        break;
    }
  }

  return (
    <label className="text-sm leading-4 font-semibold w-full">
      {label ? (
        <label className="block font-semibold text-sm leading-4 mb-2">
          {label}
        </label>
      ) : null}
      <input
        className={computedClassName}
        type={type}
        onChange={handleChange}
        {...props}
        onFocus={e => {
          props.onFocus && props.onFocus(e);
          setFocused(true);
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e);
          setFocused(false);
        }}
      />
    </label>
  );
};
