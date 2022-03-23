import { authenticateFx } from '@shared/model';
import type { FormEvent } from 'react';
import { apiDomain } from '@shared/model';
import { createEvent, createStore, sample, forward } from 'effector';
import { jsonApi, setToken } from '@api';

export type FieldChangedByKeyEvent = { key: string; value: string | boolean };
type SignUpResponse = { token?: string };

export const signUp = apiDomain.createEffect(
  (credentials: {
    email: string;
    password: string;
    fio: string;
    phone: string;
    password_confirmation: string;
  }) => {
    return jsonApi<SignUpResponse>('/sign_up', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        fio: credentials.fio,
        phone: credentials.phone,
        password_confirmation: credentials.password_confirmation,
      }),
      credentials: 'include',
    });
  },
);

export const fieldChangedBykey = createEvent<FieldChangedByKeyEvent>();
export const fieldChanged = createEvent<{ key: string; value: string }>();
export const signUpNull = createEvent();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const $form = createStore({
  email: '',
  password: '',
  fio: '',
  phone: '',
  password_confirmation: '',
  pesrsonalConfirmed: false,
})
  .on(fieldChanged, (state, payload) => {
    return { ...state, [payload.key]: payload.value };
  })
  .on(fieldChangedBykey, (state, data) => {
    return { ...state, [data.key]: data.value };
  })
  .on(signUpNull, () => {
    return {
      email: '',
      password: '',
      fio: '',
      phone: '',
      password_confirmation: '',
      pesrsonalConfirmed: false,
    };
  });

export const $error = createStore<Error | null>(null).on(
  signUp.fail,
  (a, b) => {
    console.log(
      new Error(
        'Возникла ошибка. Такой e-mail уже занят или вводимый пароль не подходит',
      ),
    );

    return new Error(
      'Возникла ошибка. Такой e-mail уже занят или вводимый пароль не подходит',
    );
  },
);

const userLoaded = signUp.doneData.filterMap(data => ({
  token: data.token,
}));

const $token = createStore<SignUpResponse>({ token: '' }).on(
  userLoaded,
  (_, data) => data,
);
$token.watch(data => {
  if (data.token) {
    setToken(data.token);
    authenticateFx();
  }
});

formSubmitted.watch(e => {
  e.preventDefault();
});

sample({
  clock: formSubmitted,
  source: $form,
  target: signUp,
});

forward({
  from: signUp.done,
  to: authenticateFx,
});
