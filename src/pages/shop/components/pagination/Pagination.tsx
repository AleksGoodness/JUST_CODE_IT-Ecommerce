import PaginationMui from '@mui/material/Pagination';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface IProps {
  limit: number;
  total: number;
}

const Pagination = ({ limit, total }: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const currentPage = useMemo(() => {
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    return Math.floor(offset / limit) + 1;
  }, [searchParams, limit]);

  const pageCount = Math.ceil(total / limit);

  useEffect(() => {
    if (location.state?.page) {
      searchParams.set('offset', '0');
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  }, [location.state, searchParams, navigate, location.pathname]);

  const handleChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    const newOffset = (page - 1) * limit;

    searchParams.set('offset', newOffset.toString());
    searchParams.set('limit', limit.toString());

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <PaginationMui
      color="primary"
      count={pageCount}
      onChange={handleChange}
      page={currentPage}
    />
  );
};

export default Pagination;
