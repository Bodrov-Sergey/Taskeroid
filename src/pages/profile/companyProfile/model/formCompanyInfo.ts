import { FormEvent } from 'react';
import { createEvent, createStore, sample } from 'effector';
import {
  apiDomain,
  authenticateFx,
  checkUserRequirenmentsFx,
} from '@shared/model';

import { jsonApi } from '@api';
import { toast } from 'react-toastify';

type FieldChangedEvent = { key: string; value: string };
type Form = {
  id: number | null;
  title: string;
  kpp: string;
  address: string;
  rc: string;
  ogrn: string;
  bank: string;
  inn: string;
  kc: string;
  bik: string;
  email: string;
  signer: string;
};
export const sendDataChangeCompProfileFx = apiDomain.createEffect(
  (data: Form) => {
    return jsonApi(`/profile/company/edit`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        email: data.email,
        kpp: data.kpp,
        address: data.address,
        rc: data.rc,
        ogrn: data.ogrn,
        bank: data.bank,
        inn: data.inn,
        kc: data.kc,
        bik: data.bik,
        signer: data.signer,
      }),
    });
  },
);

export const getCompanyFx = apiDomain.createEffect(() => {
  return jsonApi<Form>('/profile/company');
});

export const fieldChanged = createEvent<FieldChangedEvent>();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

export const $companyInfo = createStore<Form>({
  title: '',
  email: '',
  kpp: '',
  address: '',
  rc: '',
  ogrn: '',
  bank: '',
  inn: '',
  kc: '',
  bik: '',
  signer: '',
  id: null,
})
  .on(fieldChanged, (state, data) => {
    return { ...state, [data.key]: data.value };
  })
  .on(getCompanyFx.doneData, (state, data) => ({ ...state, ...data }))
  .on(sendDataChangeCompProfileFx.doneData, () => {
    toast.success('Данные успешно обновлены');
    checkUserRequirenmentsFx();
  });

formSubmitted.watch(e => {
  e.preventDefault();
});

sample({
  clock: formSubmitted,
  source: $companyInfo,
  target: sendDataChangeCompProfileFx,
});
