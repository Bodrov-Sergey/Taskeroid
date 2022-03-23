import cx from 'classnames';
import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';

type Props = {
  label?: string;
  onChange: (args: { key: string; value: string }) => void;
} & Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'onChange'
>;

export const MultilineField: FC<Props> = ({
  label,
  className,
  onChange,
  ...props
}) => {
  const computedClassName = cx(
    'block outline-none w-full border border-green-light h-11 px-4 text-dark text-base',
    className,
    {
      'bg-gray-light': props.disabled,
    },
  );

  return (
    <label className="text-sm leading-4 font-semibold w-full">
      <span className="inline-block mb-2">{label}</span>
      <textarea
        className={cx(computedClassName, `resize-none p-4 h-16`)}
        onChange={e => onChange({ key: e.target.name, value: e.target.value })}
        {...props}
      />
    </label>
  );
};
