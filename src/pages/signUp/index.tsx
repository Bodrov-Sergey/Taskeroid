import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

import { TextField, Button, Checkbox, Spinner } from '@shared/ui';
import styles from './styles.module.scss';

import {
  $form,
  $error,
  formSubmitted,
  fieldChanged,
  fieldChangedBykey,
  FieldChangedByKeyEvent,
  signUp,
  signUpNull,
} from './model/form';
import { $auth } from '@shared/model';
import classNames from 'classnames';
import { ReactComponent as S } from './s.svg';

const SignUp: FC = () => {
  const signUpStore = useStore($form);
  const { url } = useRouteMatch();
  const { user } = useStore($auth);
  const error = useStore($error);
  const history = useHistory();
  useEffect(() => {
    signUpNull();
  }, []);

  if (user && url == '/signUp') {
    history.replace('/profile/company');
  }

  const isLoading = useStore(signUp.pending);

  const fieldChangedByKeyHandler = fieldChangedBykey.prepend(
    (v: FieldChangedByKeyEvent) => ({
      key: v.key,
      value: v.value,
    }),
  );

  return (
    <div
      className={classNames('absolute inset-0 bg-white z-51', styles.wrapper)}
    >
      <div className={styles.imageBlock}>
        <div className="uppercase text-white font-semibold flex flex-col items-center">
          <S />
          <p className="mt-4">Project менеджер</p>
        </div>
      </div>
      <div className={styles.formWrapper}>
        <form onSubmit={formSubmitted} className={styles.form}>
          <h1 className="mb-6 text-4xl">Регистрация</h1>
          {error && (
            <p className="text-red-400 mb-6" data-cy="loginError">
              {error.message}
            </p>
          )}
          <div>
            <TextField
              className="mb-2"
              label="ФИО"
              value={signUpStore.fio}
              name="fio"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              type="text"
              mask="fullName"
              required
            />
          </div>
          <div>
            <TextField
              className="mb-2"
              label="E-mail"
              type="email"
              value={signUpStore.email}
              name="email"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <TextField
              className="mb-2"
              label="Телефон"
              type="tel"
              value={signUpStore.phone}
              name="phone"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              required
              mask="phone"
            />
          </div>
          <div className="mt-6">
            <TextField
              className="mb-2"
              label="Пароль"
              value={signUpStore.password}
              type="password"
              name="password"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              required
            />
          </div>
          <div className="mt-6">
            <TextField
              className="mb-2"
              label="Повторите пароль"
              value={signUpStore.password_confirmation}
              type="password"
              name="password_confirmation"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              required
            />
          </div>
          <Checkbox
            label="Я даю своё согласие на обработку персональных данных согласно политике конфиденциальности."
            className="mt-6"
            checked={signUpStore.pesrsonalConfirmed}
            onChange={() => {
              fieldChangedByKeyHandler({
                value: !signUpStore.pesrsonalConfirmed,
                key: 'pesrsonalConfirmed',
              });
            }}
          />
          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading || !signUpStore.pesrsonalConfirmed}
          >
            Зарегистрироваться
          </Button>
          <div className="m-6">
            <span>
              Уже есть аккаунт?{' '}
              <Link
                className="text-green md:hover:text-green-hover transition duration-300"
                to="/login"
              >
                Войти
              </Link>
            </span>
          </div>
          {isLoading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
