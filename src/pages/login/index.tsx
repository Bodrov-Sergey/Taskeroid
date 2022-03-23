import type { FC } from 'react';
import { useStore } from 'effector-react';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';

import { TextField, Button, Spinner } from '@shared/ui';
import styles from './styles.module.scss';

import {
  $form,
  $error,
  formSubmitted,
  fieldChanged,
  loginFx,
} from './model/form';
import { $auth } from '@shared/model';
import classNames from 'classnames';
import { ReactComponent as S } from './s.svg';

const Login: FC = () => {
  const { email, password } = useStore($form);
  const error = useStore($error);
  const { url } = useRouteMatch();
  const { user } = useStore($auth);
  const history = useHistory();

  if (user && url == '/login') {
    history.replace('/main');
  }

  const isLoading = useStore(loginFx.pending);

  return (
    <div className={classNames('absolute inset-0 bg-white', styles.wrapper)}>
      <div className={styles.imageBlock}>
        <div className="uppercase text-white font-semibold flex flex-col items-center">
          <S />
          <p className="mt-4">Project менеджер</p>
        </div>
      </div>
      <div className={styles.formWrapper}>
        <form onSubmit={formSubmitted} className={styles.form}>
          <h1 className="mb-6 text-4xl">Taskeroid</h1>
          {error && (
            <p className="text-red-400 mb-6" data-cy="loginError">
              {error.message}
            </p>
          )}
          <div>
            <TextField
              className="mb-2"
              label="Логин"
              type="email"
              value={email}
              name="email"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              data-cy="loginEmail"
              required
            />
          </div>
          <div className="mt-6">
            <TextField
              className="mb-2"
              label="Пароль"
              value={password}
              type="password"
              name="password"
              autoComplete="off"
              onChange={fieldChanged}
              disabled={isLoading}
              data-cy="loginPassword"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-5"
            disabled={isLoading}
            data-cy="loginSubmit"
          >
            Войти
          </Button>
          <div className="mt-6 mb-6">
            <span>
              Нет аккаунта?{' '}
              <Link
                className="text-green md:hover:text-green-hover transition duration-300"
                to="/signUp"
              >
                Зарегистрироваться
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

export default Login;
