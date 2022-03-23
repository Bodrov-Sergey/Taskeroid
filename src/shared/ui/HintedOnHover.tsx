import cx from 'classnames';
import { FC } from 'react';

export function HintedOnHover<T>(
  Component: FC<T>,
  hint: string,
  width?: number,
  height?: number,
) {
  return ({
    containerClassName,
    hintClassName,
    ...props
  }: T & { containerClassName?: string; hintClassName?: string }) => {
    return (
      <div
        className={cx('relative overflow-visible group', containerClassName)}
      >
        <Component {...(props as T)} />
        <div
          className={cx(
            'absolute hidden group-hover:block bg-white z-30 overflow-visible whitespace-pre-wrap right-1/2 px-2 py-[6px] text-xs leading-[14px] font-medium text-center',
            hintClassName,
          )}
          style={{ width, height, bottom: -((height || 0) + 8) }}
        >
          {hint}
          <div
            className="absolute right-0 top-[-8px] z-40"
            style={{
              borderStyle: 'solid',
              borderWidth: '0 0 8px 8px',
              borderColor: 'transparent transparent #fff transparent',
            }}
          />
        </div>
      </div>
    );
  };
}
