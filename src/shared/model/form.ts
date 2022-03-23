import * as yup from 'yup';
import {
  createStore,
  createEvent,
  sample,
  createEffect,
  forward,
} from 'effector';
import { ChangeEvent, FormEvent } from 'react';

export function createForm<T>(
  schema: yup.SchemaOf<T, File>,
  initialState: Partial<T> = {},
) {
  const validateFormFx = createEffect<Partial<T>, T, yup.ValidationError>(
    (form: Partial<T>) => {
      return schema.validate(form) as Promise<T>;
    },
  );

  const formSet = createEvent<Partial<T>>();

  const formSubmitted = createEvent();

  const formValidated = createEvent<T>();

  const $form = createStore(initialState).on(formSet, (state, payload) => ({
    ...state,
    ...payload,
  }));

  const $error = createStore<Nullable<string>>(null).on(
    validateFormFx.failData,
    (_, payload) => payload.errors[0],
  );

  const handleChange = formSet.prepend<ChangeEvent<HTMLInputElement>>(
    e =>
      ({
        [e.target.name]: e.target.value,
      } as unknown as Partial<T>),
  );

  const handleSelect = <S>(value: S, key: string) => {
    formSet.prepend<{ [key: string]: S }>(
      data => data as unknown as Partial<T>,
    )({
      [key]: value,
    });
  };

  const handleDrop = (value: File | File[] | undefined, name: string) => {
    formSet.prepend<{ [key: string]: File | File[] | undefined }>(
      data => data as unknown as Partial<T>,
    )({ [name]: value });
  };

  const handleSubmit = formSubmitted.prepend<FormEvent<HTMLFormElement>>(e => {
    e.preventDefault();
  });

  sample({
    clock: formSubmitted,
    source: $form,
    target: validateFormFx,
  });

  forward({
    from: validateFormFx.doneData,
    to: formValidated,
  });

  return {
    $form,
    $error,
    formSet,
    formSubmitted,
    formValidated,
    handleChange,
    handleSelect,
    handleDrop,
    handleSubmit,
  };
}

export function file(
  size = Infinity,
  message = 'Размер файла превышает допустимый размер',
) {
  return yup
    .mixed()
    .test('isFile', value => value instanceof File)
    .test('size', message, (value: File) => value.size <= size);
}

export const { string, bool, number, array, object, date, mixed } = yup;
