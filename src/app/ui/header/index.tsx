import { FC, useState } from 'react';
import { useStore } from 'effector-react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { ReactComponent as Logo } from './logo_main.svg';
import { ReactComponent as User } from '@shared/assets/user.svg';
import { ReactComponent as Exit } from './exit.svg';
import { ReactComponent as Bell } from './bell.svg';
import { Button } from '@shared/ui';
import { Link } from 'react-router-dom';

import { $auth, logoutFx } from '@shared/model';
import classNames from 'classnames';

export const Header: FC = () => {
  const { user } = useStore($auth);

  const { pathname } = useLocation();

  const [hoverMenu, activateHoverMenu] = useState<boolean>(false);

  return (
    <header className="h-[70px] bg-gradient-to-r from-green to-green-dim px-8 py-5 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center justify-between lg:w-1/2">
        <div>
          <Logo className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center text-white">
        {user && (
          <div
            className="text-white font-bold flex items-center cursor-pointer relative"
            onMouseOver={() => {
              activateHoverMenu(true);
            }}
            onMouseLeave={() => {
              activateHoverMenu(false);
            }}
          >
            <User className="cursor-pointer w-5 h-5 " />
            <p className="text-white ml-3 mr-2 font-semibold">{user.fio}</p>
            <ul
              style={
                hoverMenu
                  ? { maxHeight: '105px', borderWidth: '1px' }
                  : { maxHeight: '0px' }
              }
              className="absolute top-full  overflow-hidden font-normal duration-300 bg-white  right-0 text-black text-sm min-w-[261px] border-solid  border-green-light"
            >
              <li
                style={hoverMenu ? { opacity: 1 } : { opacity: 0 }}
                className={classNames(
                  'px-4 w-full duration-300 md:hover:text-green',
                  pathname == '/profile/company'
                    ? 'border-l-4 pl-3 border-green'
                    : '',
                )}
              >
                <Link
                  to="/profile/company"
                  className={
                    'border-b border-green-light  py-2 w-full block whitespace-nowrap'
                  }
                >
                  Профиль компании
                </Link>
              </li>
              <li
                className={classNames(
                  'px-4 w-full duration-300 md:hover:text-green',
                  pathname == '/profile' ? 'border-l-4 pl-3 border-green' : '',
                )}
              >
                <Link
                  to="/profile"
                  className="border-b border-green-light py-2 w-full block whitespace-nowrap"
                >
                  Мой профиль
                </Link>
              </li>
              <li className="px-4 w-full duration-300 md:hover:text-green">
                <div
                  onClick={() => {
                    logoutFx();
                  }}
                  className="py-2 w-full block whitespace-nowrap"
                >
                  Выход
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
