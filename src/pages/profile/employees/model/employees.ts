import { FormEvent } from 'react';
import { createEvent, createStore, sample } from 'effector';
import { apiDomain } from '@shared/model';

import { jsonApi } from '@api';
import { toast } from 'react-toastify';

type FieldChangedEvent = { key: string; value: string };
type Employee = {
  company_id: number | null;
  email: string;
  fio: string;
  id: number | null;
  phone: string;
  role: string;
  role_in_company: string;
};

type NewEmployee = {
  fio: string;
  email: string;
  phone: string;
};

export const deleteEmployeeFx = apiDomain.createEffect((id: number) => {
  return jsonApi<Employee[]>(`/profile/delete_worker/` + id, {
    method: 'DELETE',
  });
});

export const createEmployeeFx = apiDomain.createEffect((data: NewEmployee) => {
  return jsonApi<Employee[]>(`/profile/create_worker`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      fio: data.fio,
      email: data.email,
      phone: data.phone,
    }),
  });
});

export const getEmployeesFx = apiDomain.createEffect(() => {
  return jsonApi<Employee[]>('/profile/workers');
});

export const fieldChanged = createEvent<FieldChangedEvent>();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const nullForm = createEvent();

export const $employees = createStore<Employee[]>([])
  .on(getEmployeesFx.doneData, (_, data) => data)
  .on(createEmployeeFx.doneData, (_, data) => {
    nullForm();
    toast.success('Сотрудник успешно добавлен');
    return data;
  })
  .on(createEmployeeFx.fail, () => {
    nullForm();
    toast.error('Ошибка, сотрудник с введенным e-mail уже существует');
  })
  .on(deleteEmployeeFx.fail, () => {
    nullForm();
    toast.error('Нельзя удалить себя или директора');
  });

export const $employeeForm = createStore<NewEmployee>({
  fio: '',
  email: '',
  phone: '',
})
  .on(fieldChanged, (state, data) => {
    return { ...state, [data.key]: data.value };
  })
  .on(nullForm, () => ({ fio: '', email: '', phone: '' }));

formSubmitted.watch(e => {
  e.preventDefault();
});

sample({
  clock: formSubmitted,
  source: $employeeForm,
  target: createEmployeeFx,
});
