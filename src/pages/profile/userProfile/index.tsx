import { ChangeEvent, FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import { TextField, Button, PasswordField, Spinner } from '@shared/ui';

import {
  $personalInfo,
  fieldChanged,
  formSubmitted,
  sendDataChangeUserProfileFx,
  setAuth,
} from './model/formPersonalInfo';
import {
  $password,
  nullPassword,
  passFieldChanged,
  passFormSubmitted,
  sendDataChangePasswordFx,
} from './model/formPasswordChange';
import { ReactComponent as Exit } from '@shared/assets/exit.svg';
import { $auth, logoutFx } from '@shared/model';

const handleChangePassword = passFieldChanged.prepend(
  (e: ChangeEvent<HTMLInputElement>) => ({
    key: e.target.name,
    value: e.target.value,
  }),
);

const Profile: FC = () => {
  const form = useStore($personalInfo);
  const auth = useStore($auth);
  const isLoadingUserProfile = useStore(sendDataChangeUserProfileFx.pending);
  const isLoadingPassword = useStore(sendDataChangePasswordFx.pending);
  useEffect(() => {
    if (auth.user) {
      setAuth({
        fio: auth.user?.fio,
        phone: auth.user?.phone,
        email: auth.user?.email,
        position: auth.user?.role_in_company,
      });
    }
    return nullPassword();
  }, []);

  const formPassword = useStore($password);
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1>Мой профиль</h1>
        <div
          onClick={() => {
            logoutFx();
          }}
          className="text-green md:hover:text-green-hover transition duration-300 cursor-pointer flex items-center uppercase tracking-wider font-semibold text-xs"
        >
          <Exit className="mr-1" />
          Выйти из профиля
        </div>
      </div>
      <form
        className="grid grid-flow-row auto-rows-auto gap-6 max-w-[900px]"
        onSubmit={formSubmitted}
      >
        <div className="grid grid-flow-row auto-rows-auto gap-6">
          <div className="grid grid-cols-2 gap-6">
            <TextField
              disabled={isLoadingUserProfile}
              name="fio"
              onChange={fieldChanged}
              type="text"
              label="ФИО"
              value={form.fio}
              mask="fullName"
              required
            />
            <TextField
              disabled={isLoadingUserProfile}
              label="Должность"
              name="position"
              value={form.position}
              onChange={fieldChanged}
              required
            />
            <TextField
              disabled={isLoadingUserProfile}
              label="Телефон"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={fieldChanged}
              required
              mask="phone"
            />
            <TextField
              disabled={isLoadingUserProfile}
              label="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={fieldChanged}
              required
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button disabled={isLoadingUserProfile} type="submit">
            Сохранить
          </Button>
        </div>
        {isLoadingUserProfile && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </form>
      <form
        className="grid grid-flow-row auto-rows-auto gap-6 max-w-[438px] mt-10"
        onSubmit={passFormSubmitted}
      >
        <div className="grid grid-flow-row auto-rows-auto gap-6">
          <h1>Смена пароля</h1>
          <div className="grid grid-cols-1 gap-6">
            <PasswordField
              disabled={isLoadingPassword}
              label="Текущий пароль"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              value={formPassword.currentPassword}
              onChange={handleChangePassword}
              required
            />
            <PasswordField
              disabled={isLoadingPassword}
              label="Новый пароль"
              type="password"
              autoComplete="new-password"
              name="newPassword"
              value={formPassword.newPassword}
              onChange={handleChangePassword}
              required
            />
            <PasswordField
              disabled={isLoadingPassword}
              autoComplete="new-password"
              type="password"
              label="Повторите новый пароль"
              name="doubleNewPassword"
              value={formPassword.doubleNewPassword}
              onChange={handleChangePassword}
              required
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button disabled={isLoadingPassword} type="submit">
            Сохранить
          </Button>
        </div>
        {isLoadingPassword && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </form>
    </>
  );
};

export default Profile;
