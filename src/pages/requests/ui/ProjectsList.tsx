import cx from 'classnames';
import { useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@shared/ui/Button';

const ProjectsList: FC = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1>Проекты</h1>
        <Link to="/projects/new">
          <Button type="submit" className="!py-2 !px-3 !text-xs">
            Добавить проект
          </Button>
        </Link>
      </div>
      В разработке
    </>
  );
};
export default ProjectsList;
