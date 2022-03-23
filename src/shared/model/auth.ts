import { createStore } from 'effector';
import { jsonApi, killToken, setToken } from '@api';

import { apiDomain } from './api';

type AuthUserData = {
  company_id: null | number;
  created_at: string;
  email: string;
  fio: string;
  id: number;
  password_digest: string;
  phone: string;
  role: string;
  updated_at: string;
  role_in_company: string;
};

type WhoAmIResponse = {
  token: string;
  user: AuthUserData;
  docs: boolean;
  infos: boolean;
  vendors: boolean;
};

export const authenticateFx = apiDomain.createEffect(() => {
  // if (import.meta.env.DEV) {
  //   return {
  //     token: import.meta.env.VITE_TOKEN,
  //     user: {
  //       company_id: 1,
  //       created_at: '2021-12-10T17:07:39.029+03:00',
  //       email: 'user@pochta.com',
  //       fio: 'Админ Админов',
  //       id: 2,
  //       last_auth: null,
  //       password_digest: '7c4a8d09ca3762af61e59520943dc26494f8941b',
  //       phone: '88000078678',
  //       role: 'admin',
  //       role_in_company: 'director',
  //       updated_at: '2021-12-10T17:07:39.029+03:00',
  //     },
  //     docs: true,
  //     vendors: true,
  //     infos: true,
  //   } as WhoAmIResponse;
  // } else {
  return jsonApi<WhoAmIResponse>('/current_user', {
    credentials: 'include',
  });
  // }
});
export const checkUserRequirenmentsFx = apiDomain.createEffect(() => {
  return jsonApi<WhoAmIResponse>('/current_user', {
    credentials: 'include',
  });
});

export const logoutFx = apiDomain.createEffect(() => {
  return jsonApi('/logout', {
    method: 'DELETE',
  });
});

type Auth = {
  token?: string;
  user: AuthUserData | null;
  docs?: boolean;
  infos?: boolean;
  vendors?: boolean;
};

export const userLoaded = authenticateFx.doneData.filterMap(data => ({
  token: data.token,
  user: data.user,
  docs: data.docs,
  infos: data.infos,
  vendors: data.vendors,
}));

export const $auth = createStore<Auth>({ user: null })
  .on(userLoaded, (_, data) => data)
  .on(checkUserRequirenmentsFx.doneData, (state, data) => ({
    ...state,
    docs: data.docs,
    infos: data.infos,
    vendors: data.vendors,
  }))
  .on(logoutFx, () => {
    killToken();
    return { user: null };
  });

$auth.watch(data => {
  if (data.token) {
    setToken(data.token);
  }
});
