import { setToken, jsonApi } from '@api';
import type { FormEvent } from 'react';
import { createEvent, createStore, sample, forward } from 'effector';
import { authenticateFx } from '@shared/model';
import { apiDomain } from '@shared/model';

type AuthUserData = {
  company_id: null | number;
  created_at: string;
  email: string;
  FormField: string;
  id: number;
  password_digest: string;
  phone: string;
  role: string;
  updated_at: string;
};

type loginResponse = {
  token: string;
  user: AuthUserData;
};

export const loginFx = apiDomain.createEffect(
  (credentials: { email: string; password: string }) => {
    return jsonApi<loginResponse>('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...credentials }),
      credentials: 'include',
    });
  },
);
export const fieldChanged = createEvent<{ key: string; value: string }>();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const $form = createStore({ email: '', password: '' }).on(
  fieldChanged,
  (state, payload) => {
    return { ...state, [payload.key]: payload.value };
  },
);
export const $error = createStore<Error | null>(null).on(
  loginFx.fail,
  () => new Error('Неверный логин или пароль'),
);

const userLoaded = loginFx.doneData.filterMap(data => ({
  token: data.token,
}));

type Auth = { token?: string };

export const $token = createStore<Auth>({ token: '' }).on(
  userLoaded,
  (_, data) => data,
);

$token.watch(data => {
  if (data.token) {
    setToken(data.token);
  }
});

formSubmitted.watch(e => {
  e.preventDefault();
});

sample({
  clock: formSubmitted,
  source: $form,
  target: loginFx,
});

forward({
  from: loginFx.done,
  to: authenticateFx,
});
