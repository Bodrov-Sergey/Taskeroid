import { authenticateFx } from '@shared/model/auth';
import { FormEvent } from 'react';
import { createEvent, createStore, sample, forward } from 'effector';
import { apiDomain } from '@shared/model';

import { jsonApi } from '@api';
import { toast } from 'react-toastify';

type FieldChangedEvent = { key: string; value: string };
type Form = {
  fio: string;
  phone: string;
  email: string;
  position: string;
};
export const sendDataChangeUserProfileFx = apiDomain.createEffect(
  (data: Form) => {
    return jsonApi(`/update_info`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        fio: data.fio,
        email: data.email,
        phone: data.phone,
        role_in_company: data.position,
      }),
    });
  },
);

export const setAuth = createEvent<Form>();
export const fieldChanged = createEvent<FieldChangedEvent>();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

export const $personalInfo = createStore<Form>({
  phone: '',
  email: '',
  fio: '',
  position: '',
})
  .on(fieldChanged, (state, data) => {
    return { ...state, [data.key]: data.value };
  })
  .on(setAuth, (state, data) => {
    return { ...state, ...data };
  })
  .on(sendDataChangeUserProfileFx.doneData, () => {
    toast.success('Данные успешно обновлены');
  });

formSubmitted.watch(e => {
  e.preventDefault();
});

sample({
  clock: formSubmitted,
  source: $personalInfo,
  target: sendDataChangeUserProfileFx,
});

forward({
  from: sendDataChangeUserProfileFx.done,
  to: authenticateFx,
});
