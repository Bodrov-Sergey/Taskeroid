import cx from 'classnames';
import {
  useState,
  useRef,
  useEffect,
  FC,
  ReactElement,
  RefObject,
} from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as File } from './file.svg';
import { ReactComponent as Pie } from './pie-chart.svg';
import { ReactComponent as Sticker } from './sticker.svg';
import { ReactComponent as Star } from './star.svg';

export const Sidebar: FC = () => {
  const navItems = [
    {
      icon: <Sticker className="w-5 h-5 stroke-current mr-3" />,
      href: '/main',
      title: 'Входящие',
      exact: false,
    },
    {
      icon: <File className="w-5 h-5 stroke-current mr-3" />,
      href: '/tasks',
      title: 'Задачи',
    },
    {
      icon: <Star className="w-5 h-5 stroke-current mr-3" />,
      href: '/projects',
      title: 'Проекты',
    },
    {
      icon: <Pie className="w-5 h-5 stroke-current mr-3" />,
      href: '/profile/employees',
      title: 'Сотрудники',
    },
  ];

  const SingleNav: FC<NavProps> = ({ href, exact, title, icon }) => (
    <NavLink
      to={href}
      className="text-white font-bold flex items-center md:hover:text-green transition-colors duration-300 cursor-pointer"
      activeClassName="!text-green"
      key={href}
      exact={exact}
      isActive={(_, location) => location.pathname.includes(href)}
    >
      {icon}
      {title}
    </NavLink>
  );

  interface NavProps {
    href: string;
    exact?: boolean;
    title: string;
    icon: ReactElement;
  }

  return (
    <aside className="max-w-[285px] xl:max-w-[320px] w-full flex flex-col justify-between bg-dark xl:p-8 p-4 fixed">
      <nav className="flex flex-col space-y-4 whitespace-nowrap">
        {navItems.map(item => (
          <SingleNav
            href={item.href}
            title={item.title}
            icon={item.icon}
            key={item.href}
            exact={item.exact}
          />
        ))}
      </nav>
    </aside>
  );
};
