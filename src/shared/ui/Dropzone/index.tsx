import cx from 'classnames';
import { FC, DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { HintedOnHover } from '@shared/ui/HintedOnHover';
import { ReactComponent as TrashIcon } from '@shared/assets/trash.svg';
import { ReactComponent as RotateIcon } from '@shared/assets/rotate.svg';

import { ReactComponent as ShareIcon } from './share.svg';
import { ReactComponent as OkIcon } from './circle-ok.svg';
import { ReactComponent as NotAllowedIcon } from './not-allowed.svg';
import { ReactComponent as WhiteOkIcon } from './white-circle-ok.svg';
import { ReactComponent as DownloadSample } from '@shared/assets/download.svg';
import { ReactComponent as ArrowMore } from '@shared/assets/arrow_more.svg';
import { file } from '@shared/model';
import { TextField } from '../TextField';
import { Event } from 'effector';

const HintedRotateIcon = HintedOnHover(
  RotateIcon,
  'Загрузить новую версию документа',
  140,
  -20,
);
const HintedTrashIcon = HintedOnHover(TrashIcon, 'Удалить документ', 122, -20);

const mimeTypes = {
  xls: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
};

export type Value = {
  file: File;
  meta: Record<string, boolean | number | string | undefined>;
};

type BaseProps = {
  fileTypes: Array<keyof typeof mimeTypes>;
  label: string;
  maxSize?: number;
  error?: boolean;
  required?: boolean;
  name: string;
  disabled?: boolean;
  whithoutComment?: boolean;
  descriptionErrorReset?: () => void;
  sample?: string;
  onDelete?: (file: Value, name: string) => void;
} & Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onDrop' | 'onError'
>;

type SingleFileProps = {
  onDrop: (file: Value, name: string) => void;
  onError?: (rejection: string, name: string) => void;
  value?: Value;
  multiple?: false;
} & BaseProps;

type MultipleFilesProps = {
  onDrop: (files: Value[], name: string) => void;
  onError?: (rejections: string[], name: string) => void;
  value?: Value[];
  multiple: true;
} & BaseProps;

function isMultple(
  props: SingleFileProps | MultipleFilesProps,
): props is MultipleFilesProps {
  return props.multiple === true;
}

export const Dropzone: FC<SingleFileProps | MultipleFilesProps> = props => {
  const iconClassName =
    'stroke-current md:hover:text-green md:hover:scale-105 transition-all duration-300';
  let handleDrop;
  let handleError;
  if (isMultple(props)) {
    handleDrop = (acceptedFiles: File[]) => {
      props.onDrop(
        acceptedFiles.map(file => ({
          file,
          meta: { isNew: true },
        })),
        props.name,
      );
    };
    handleError = (rejections: FileRejection[]) => {
      if (props.onError) {
        props.onError(
          rejections.map(rejection => rejection.file.name),
          props.name,
        );
      }
    };
  } else {
    handleDrop = (acceptedFiles: File[]) => {
      props.onDrop(
        { file: acceptedFiles[0], meta: { isNew: true } },
        props.name,
      );
    };
    handleError = (rejections: FileRejection[]) => {
      if (props.onError) {
        props.onError((rejections[0] as FileRejection).file.name, props.name);
      }
    };
  }
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: handleDrop,
    accept: props.fileTypes.map(type => mimeTypes[type]).join(', '),
    maxSize: props.maxSize || 3145728,
    maxFiles: props.multiple ? Infinity : 1,
    multiple: props.multiple,
    disabled: props.disabled,
    onDropRejected: handleError,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isMultple(props)) {
    const value = props.value ?? [];
    let acceptedFiles = 0;
    let rejectedFiles = 0;
    value.forEach(el => {
      el.meta.status == 'ok'
        ? acceptedFiles++
        : el.meta.status == 'canceled'
        ? rejectedFiles++
        : null;
    });

    return (
      <div className={cx('relative', props.className)}>
        {props.disabled && (
          <div
            className="absolute inset-0 opacity-50 bg-white z-20 cursor-not-allowed"
            onClick={e => e.stopPropagation()}
          />
        )}

        <div
          className={cx('relative flex flex-col border-green-light border ')}
        >
          {/* {props.required && (
            <div className="absolute top-0 right-0 bg-blue text-white px-[10px] py-[6px] flex items-center justify-center">
              <WhiteOkIcon className="mr-[6px]" />
              Обязательный документ
            </div>
          )} */}
          <div
            className={cx('flex justify-between min-h-[62px]', {
              'bg-white': value.length === 0,
              'bg-blue-light': value.length > 0,
              'bg-red-dim': rejectedFiles,
              'bg-teal': acceptedFiles && !rejectedFiles,
            })}
          >
            <div className="font-semibold flex items-center px-4 py-3 min-h-full max-w-[420px]">
              {isDragActive ? 'Отпустите для добавления' : props.label}
            </div>
            <div className="flex min-h-full">
              {props.sample ? (
                <a
                  className="text-green font-medium whitespace-nowrap pr-5 py-3 flex items-center gap-[6px] sm:hover:text-green-hover transition duration-300"
                  href={props.sample}
                >
                  <DownloadSample className="stroke-current" />
                  Скачать шаблон
                </a>
              ) : null}
              <div
                {...getRootProps()}
                className={cx(
                  'cursor-pointer bg-white relative whitespace-nowrap text-green font-medium text-xs text-center flex items-center min-h-full px-4 border-x border-dashed border-green-light',
                  { 'border-b': isOpen },
                )}
              >
                Нажмите сюда для загрузки <br /> или перетащите файл сюда
                <input {...getInputProps()} />
              </div>
              <div
                className={cx(
                  'whitespace-nowrap pl-[65px]  py-3 flex items-center text-xs font-medium',
                  {
                    'text-gray pr-4': value.length === 0,
                    'text-black pr-3': value.length > 0,
                  },
                )}
              >
                {!rejectedFiles && !acceptedFiles ? (
                  `Загружено файлов: ${value.length}`
                ) : (
                  <>
                    {acceptedFiles ? (
                      <span className="text-green">
                        Принято файлов: {acceptedFiles}
                      </span>
                    ) : null}{' '}
                    {rejectedFiles ? (
                      <span className="text-red">
                        Отклонено файлов: {rejectedFiles}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
              {value.length > 0 ? (
                <div className="flex items-center py-5 pr-4">
                  <ArrowMore
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className={cx('transition duration-300 cursor-pointer', {
                      'rotate-180': isOpen,
                    })}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <ul
            className={cx('px-4 duration-300 overflow-hidden', {
              'max-h-[0px]': !isOpen,
            })}
            style={isOpen ? { maxHeight: value.length * 70 + 'px' } : {}}
          >
            {value.map((fileValue, i) => (
              <li
                key={i}
                className={cx('grid gap-5 min-h-[68px] w-full py-3', {
                  'border-b dorder-gray-border': i + 1 != value.length,
                })}
                style={{ gridTemplateColumns: '45fr 55fr' }}
              >
                <div
                  style={{ gridTemplateColumns: '1fr auto' }}
                  className="grid items-center gap-5"
                >
                  <div
                    title={fileValue.file.name}
                    className={cx(
                      'whitespace-nowrap overflow-hidden text-ellipsis cursor-default font-semibold',
                      {
                        'text-green': fileValue.meta.status != 'canceled',
                        'text-red': fileValue.meta.status == 'canceled',
                      },
                    )}
                  >
                    {fileValue.file.name}
                  </div>
                  <div className="flex items-center">
                    {!props.error && (
                      <HintedRotateIcon
                        onClick={e => {
                          e.stopPropagation();
                          // eslint-disable-next-line
                          // @ts-ignore
                          props.onDelete(props.value[i], props.name);
                          open();
                        }}
                      />
                    )}
                    <HintedTrashIcon
                      className="srtoke-current text-red"
                      containerClassName="ml-2"
                      onClick={e => {
                        e.stopPropagation();
                        // eslint-disable-next-line
                        // @ts-ignore
                        props.onDelete(props.value[i], props.name);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-5">
                  {fileValue.meta.isNew ? (
                    !props.whithoutComment ? (
                      <TextField
                        onChange={e => {
                          props.descriptionErrorReset
                            ? props.descriptionErrorReset()
                            : null;
                          fileValue.meta.description = e.value;
                        }}
                        value={fileValue.meta.description?.toString()}
                        placeholder="Комментарий к документу"
                      />
                    ) : null
                  ) : (
                    <>
                      <div className="text-sm">
                        {fileValue.meta.description}
                      </div>
                      {value.length > 1 && (
                        <div className="text-xs font-medium">
                          {fileValue.meta.status == 'waiting' ? (
                            <span className="text-blue">В обработке</span>
                          ) : fileValue.meta.status == 'ok' ? (
                            <span className="text-green">Одобрен</span>
                          ) : (
                            <span className="text-red">Отклонён</span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={cx('relative', props.className)}>
          {props.disabled && (
            <div
              className="absolute inset-0 opacity-50 bg-white z-20 cursor-not-allowed"
              onClick={e => e.stopPropagation()}
            />
          )}

          <div
            className={cx('relative flex flex-col border-green-light border ')}
          >
            {/* {props.required && (
            <div className="absolute top-0 right-0 bg-blue text-white px-[10px] py-[6px] flex items-center justify-center">
              <WhiteOkIcon className="mr-[6px]" />
              Обязательный документ
            </div>
          )} */}
            <div
              className={cx('flex justify-between min-h-[62px]', {
                'bg-white': !props.value,
                'bg-blue-light': props.value,
                'bg-red-dim': props.value?.meta.status == 'canceled',
                'bg-teal': props.value?.meta.status == 'ok',
              })}
            >
              <div className="font-semibold flex items-center px-4 py-3 min-h-full max-w-[420px]">
                {isDragActive ? 'Отпустите для добавления' : props.label}
              </div>
              <div className="flex min-h-full">
                {props.sample ? (
                  <a
                    className="text-green font-medium whitespace-nowrap pr-5 py-3 flex items-center gap-[6px] sm:hover:text-green-hover transition duration-300"
                    href={props.sample}
                  >
                    <DownloadSample className="stroke-current" />
                    Скачать шаблон
                  </a>
                ) : null}
                {!props.value ? (
                  <div
                    {...getRootProps()}
                    className={cx(
                      'cursor-pointer bg-white relative whitespace-nowrap text-green font-medium text-xs text-center flex items-center min-h-full px-4 border-x border-dashed border-green-light',
                      { 'border-b': isOpen },
                    )}
                  >
                    Нажмите сюда для загрузки <br /> или перетащите файл сюда
                    <input {...getInputProps()} />
                  </div>
                ) : null}
                <div
                  className={cx(
                    'whitespace-nowrap pl-[65px]  py-3 flex items-center text-xs font-medium',
                    {
                      'text-gray pr-4': !props.value,
                      'text-black pr-3': props.value,
                    },
                  )}
                >
                  {!props.value?.meta.status ? (
                    `Загружено файлов: ${props.value ? 1 : 0}`
                  ) : (
                    <>
                      {props.value.meta.status == 'ok' ? (
                        <span className="text-green">Принято файлов: 1</span>
                      ) : null}{' '}
                      {props.value.meta.status == 'canceled' ? (
                        <span className="text-red">Отклонено файлов: 1</span>
                      ) : null}
                    </>
                  )}
                </div>
                {props.value ? (
                  <div className="flex items-center py-5 pr-4">
                    <ArrowMore
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                      className={cx('transition duration-300 cursor-pointer', {
                        'rotate-180': isOpen,
                      })}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <ul
              className={cx('px-4 duration-300 overflow-hidden', {
                'max-h-[0px]': !isOpen,
              })}
              style={isOpen ? { maxHeight: '70px' } : {}}
            >
              <li
                className={cx('grid gap-5 min-h-[68px] w-full py-3')}
                style={{ gridTemplateColumns: '45fr 55fr' }}
              >
                <div
                  style={{ gridTemplateColumns: '1fr auto' }}
                  className="grid items-center gap-5"
                >
                  <div
                    title={props.value?.file.name}
                    className={cx(
                      'whitespace-nowrap overflow-hidden text-ellipsis cursor-default font-semibold',
                      {
                        'text-green': props.value?.meta.status != 'canceled',
                        'text-red': props.value?.meta.status == 'canceled',
                      },
                    )}
                  >
                    {props.value?.file.name}
                  </div>
                  <div className="flex items-center">
                    {!props.error && (
                      <HintedRotateIcon
                        onClick={e => {
                          e.stopPropagation();
                          setIsOpen(false);
                          // eslint-disable-next-line
                          // @ts-ignore
                          props.onDelete(props.value, props.name);
                          open();
                        }}
                      />
                    )}
                    <HintedTrashIcon
                      containerClassName="ml-2"
                      onClick={e => {
                        e.stopPropagation();
                        setIsOpen(false);

                        // eslint-disable-next-line
                        // @ts-ignore
                        props.onDelete(props.value, props.name);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-5">
                  {props.value?.meta.isNew ? (
                    !props.whithoutComment ? (
                      <TextField
                        onChange={e => {
                          props.value
                            ? (props.value.meta.description = e.value)
                            : null;
                        }}
                        value={props.value?.meta.description?.toString()}
                        placeholder="Комментарий к документу"
                      />
                    ) : null
                  ) : (
                    <>
                      <div className="text-sm">
                        {props.value?.meta.description}
                      </div>
                      {props.value && (
                        <div className="text-xs font-medium">
                          {props.value?.meta.status == 'waiting' ? (
                            <span className="text-blue">В обработке</span>
                          ) : props.value?.meta.status == 'ok' ? (
                            <span className="text-green">Одобрен</span>
                          ) : (
                            <span className="text-red">Отклонён</span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
};
