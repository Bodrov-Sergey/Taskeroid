import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import { TextField, Button, Spinner } from '@shared/ui';

import {
  $employeeForm,
  $employees,
  createEmployeeFx,
  deleteEmployeeFx,
  fieldChanged,
  formSubmitted,
  getEmployeesFx,
  nullForm,
} from './model/employees';
import { ReactComponent as Exit } from '@shared/assets/exit.svg';
import { $auth, logoutFx } from '@shared/model';

const Employees: FC = () => {
  useEffect(() => {
    getEmployeesFx();
    return nullForm();
  }, []);
  const { user } = useStore($auth);
  const employees = useStore($employees);
  const form = useStore($employeeForm);
  const isLoading = useStore(getEmployeesFx.pending)
    ? useStore(getEmployeesFx.pending)
    : useStore(createEmployeeFx.pending);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1>Сотрудники</h1>
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
        className="grid grid-flow-row auto-rows-auto gap-6 mb-4"
        onSubmit={formSubmitted}
      >
        <h2>Добавить сотрудника</h2>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            disabled={isLoading}
            label="ФИО сотрудника"
            name="fio"
            mask="fullName"
            value={form.fio}
            onChange={fieldChanged}
          />
          <TextField
            disabled={isLoading}
            label="E-mail"
            name="email"
            value={form.email}
            onChange={fieldChanged}
          />
          <TextField
            disabled={isLoading}
            label="Телефон"
            name="phone"
            value={form.phone}
            mask="phone"
            onChange={fieldChanged}
          />
        </div>
        <div className="flex items-center">
          <Button disabled={isLoading} type="submit">
            Добавить
          </Button>
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </form>
      <div className="grid grid-flow-row gap-6">
        <table className="border border-teal-dim">
          <thead className="bg-blue-light">
            <tr className="text-sm leading-4 font-semibold">
              <th className="p-4 text-left">ФИО</th>
              <th className="pr-4 text-left">E-mail</th>
              <th className="pr-4 text-left">Телефон</th>
              <th className="pr-4"></th>
            </tr>
          </thead>
          <tbody className="text-sm leading-[18px]">
            {employees?.map(employee => (
              <tr className="border-b border-teal-dim" key={employee.email}>
                <td className="p-4">
                  <div className="w-full flex">{employee.fio}</div>
                </td>
                <td className="p-4">
                  <div className="w-full flex whitespace-nowrap">
                    {employee.email}
                  </div>
                </td>
                <td className="p-4">
                  <div className="w-full flex whitespace-nowrap">
                    {employee.phone}
                  </div>
                </td>
                <td className="pr-4 py-4">
                  <div className="w-full flex flex-col gap-2">
                    {employee.id != user?.id &&
                      employee.role_in_company != 'director' && (
                        <button
                          className="px-3 py-2 text-xs uppercase border border-transparent font-semibold transition  leading-4 tracking-widest text-white bg-gradient-to-r from-red to-red"
                          onClick={() => {
                            employee.id && deleteEmployeeFx(employee.id);
                          }}
                        >
                          Удалить
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employees;
