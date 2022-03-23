import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import { TextField, Button, Spinner } from '@shared/ui';

import {
  $companyInfo,
  fieldChanged,
  formSubmitted,
  getCompanyFx,
  sendDataChangeCompProfileFx,
} from './model/formCompanyInfo';
import { ReactComponent as Exit } from '@shared/assets/exit.svg';
import { ReactComponent as Info } from '@shared/assets/info-white.svg';
import { logoutFx } from '@shared/model';

const CompanyProfile: FC = () => {
  useEffect(() => {
    getCompanyFx();
  }, []);
  const form = useStore($companyInfo);
  const isLoading = useStore(sendDataChangeCompProfileFx.pending)
    ? useStore(sendDataChangeCompProfileFx.pending)
    : useStore(getCompanyFx.pending);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1>Профиль компании</h1>
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
        className="grid grid-flow-row auto-rows-auto gap-6"
        onSubmit={formSubmitted}
      >
        <div className="grid xl:grid-cols-2 grid-cols gap-6">
          <TextField
            disabled={isLoading}
            label="Название компании"
            name="title"
            value={form.title}
            onChange={fieldChanged}
          />
          <TextField
            disabled={isLoading}
            label="Адрес"
            name="address"
            value={form.address}
            onChange={fieldChanged}
          />
          <TextField
            disabled={isLoading}
            label="Адрес корпоративной электронной почты"
            type="email"
            name="email"
            value={form.email}
            onChange={fieldChanged}
          />
          <TextField
            disabled={isLoading}
            label="Генеральный Директор"
            name="signer"
            value={form.signer}
            onChange={fieldChanged}
            mask="fullName"
          />
        </div>
        <div className="flex items-center">
          <Button disabled={isLoading} type="submit">
            Сохранить
          </Button>
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </form>
    </>
  );
};

export default CompanyProfile;
