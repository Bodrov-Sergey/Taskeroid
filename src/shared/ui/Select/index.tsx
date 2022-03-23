import cx from 'classnames';
import { isEqual } from 'lodash';
import {
  useState,
  useRef,
  useEffect,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import { memo } from '@shared/utils';

import { ReactComponent as ChevronDownIcon } from './chevron-down.svg';

type Option<T> = {
  value: T;
  name: string;
};

type Props<T> = {
  itemClassName?: string;
  dropDownClassName?: string;
  value?: T;
  options?: Option<T>[];
  label?: string;
  onChange?: (args: { key: string; value: T | undefined }) => void;
  disabled?: boolean;
  name: string;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
>;

export const Select = memo(function <T>({
  className,
  itemClassName,
  dropDownClassName,
  label,
  value,
  options,
  onChange,
  disabled,
  name,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropdown) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (e.target !== dropdown.current) {
          setIsOpen(false);
        }
      };
      window.addEventListener('click', handleOutsideClick);
      return () => window.removeEventListener('click', handleOutsideClick);
    }
  }, [dropdown]);
  const placeholder = options?.find(option =>
    isEqual(option.value, value),
  )?.name;
  return (
    <div className={cx('z-30 relative', className)}>
      {label && (
        <label
          className="block font-semibold text-sm leading-4 mb-2"
          onClick={() => setIsOpen(isOpen => !isOpen)}
        >
          {label}
        </label>
      )}
      <div
        className={cx(
          'relative z-30 overflow-y-visible leading-[19px] h-11',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
        onClick={e => {
          e.stopPropagation();
          disabled ? null : setIsOpen(isOpen => !isOpen);
        }}
      >
        <div
          className={cx(
            'flex items-center justify-between px-4 h-11 border border-green-light',
            { 'bg-gray-light': disabled },
          )}
        >
          {placeholder
            ? placeholder.length > 40
              ? `${placeholder.slice(0, 40)}...`
              : placeholder
            : 'Не выбрано'}
          <ChevronDownIcon />
        </div>
        {isOpen && options && (
          <div
            className={cx(
              'relative max-h-40 z-30 bg-white border border-green-light mt-[-1px] overflow-y-scroll',
              dropDownClassName,
            )}
            ref={dropdown}
          >
            <div
              className={cx(
                'h-11 px-4 flex items-center border-t border-green-light mt-[-1px] md:hover:bg-teal duration-300',
                itemClassName,
              )}
              onClick={() =>
                onChange && onChange({ value: undefined, key: name })
              }
            >
              Не выбрано
            </div>
            {options?.map(item => (
              <div
                className={cx(
                  'h-11 px-4 flex items-center border-t border-green-light mt-[-1px] md:hover:bg-teal duration-300',
                  itemClassName,
                )}
                key={item.name}
                onClick={() =>
                  onChange && onChange({ value: item.value, key: name })
                }
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
