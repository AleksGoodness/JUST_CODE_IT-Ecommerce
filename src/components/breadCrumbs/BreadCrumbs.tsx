import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

const BreadCrumbs = () => {
  const location = useLocation();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const arrayPath = location.pathname.split('/').filter(Boolean);
    setPaths(arrayPath);
  }, [location]);

  const buildPath = (index: number) => {
    return '/' + paths.slice(0, index + 1).join('/');
  };

  return (
    <Breadcrumbs
      sx={{
        pb: 2,
        pl: { xs: 0, sm: 2 },
      }}
    >
      <Link
        color={paths.length === 0 ? 'primary' : 'inherit'}
        component={paths.length === 0 ? 'p' : NavLink}
        to="/"
        underline="hover"
        variant="subtitle2"
      >
        <HomeIcon sx={{ display: 'flex', width: '22px' }} />
      </Link>
      {paths.map((path, index) => {
        const fullPath = buildPath(index);
        const isLast = index === paths.length - 1;
        return (
          <Link
            color={isLast ? 'primary' : 'inherit'}
            component={isLast ? 'p' : NavLink}
            key={index}
            to={fullPath}
            underline="hover"
            variant="subtitle2"
          >
            {decodeURIComponent(path)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
