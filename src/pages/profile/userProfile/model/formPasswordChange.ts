import { FormEvent } from 'react';
import { createEvent, createStore, forward, sample } from 'effector';
import { jsonApi } from '@api';
import { apiDomain } from '@shared/model';
import { toast } from 'react-toastify';

type FieldChangedEvent = { key: string; value: string };
type Form = {
  currentPassword: string;
  newPassword: string;
  doubleNewPassword: string;
};

export const passFieldChanged = createEvent<FieldChangedEvent>();
export const passFormSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const nullPassword = createEvent();

export const sendDataChangePasswordFx = apiDomain.createEffect((data: Form) => {
  return jsonApi(`/change_password`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      old_password: data.currentPassword,
      password: data.newPassword,
      password_confirmation: data.doubleNewPassword,
    }),
  });
});

export const $password = createStore<Form>({
  currentPassword: '',
  doubleNewPassword: '',
  newPassword: '',
})
  .on(passFieldChanged, (state, data) => {
    return { ...state, [data.key]: data.value };
  })
  .on(nullPassword, () => ({
    currentPassword: '',
    doubleNewPassword: '',
    newPassword: '',
  }))
  .on(sendDataChangePasswordFx.doneData, () => {
    toast.success('Данные успешно обновлены');
  });

passFormSubmitted.watch(e => {
  e.preventDefault();
});

sample({
  clock: passFormSubmitted,
  source: $password,
  target: sendDataChangePasswordFx,
});

forward({
  from: sendDataChangePasswordFx.done,
  to: nullPassword,
});
