import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

function formatDate(date: Date) {
  return `${('0' + date.getDate()).slice(-2)}.${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}.${date.getFullYear()}`;
}

type Props = {
  label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const DatePicker: FC<Props> = props => {
  const otherProps = {
    ...props,
  };
  delete otherProps.label;
  delete otherProps.type;
  delete otherProps.className;
  return (
    <label className="text-sm leading-4 font-semibold w-full z-20">
      <span className="inline-block mb-2">{props.label}</span>
      <input
        className="flex items-center justify-between outline-none w-full border border-green-light h-11 px-4 text-dark text-base"
        type="date"
        {...otherProps}
      />
    </label>
  );
};
