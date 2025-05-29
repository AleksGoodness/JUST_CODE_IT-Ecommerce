import CrossIcon from '@mui/icons-material/ClearRounded';
import { Box, List, Skeleton } from '@mui/material';

import { Title } from '../../../components';
import { useGetCategoriesQuery } from '../../../services/api';
import CategoryItem from './CategoryItem';
import CategoryResponseFormatter from './CategoryResponse';

interface Props {
  toggleDrawer: (value: boolean) => void;
}

const CategoryList = ({ toggleDrawer }: Props) => {
  const { data } = useGetCategoriesQuery({});

  return (
    <Box sx={{ width: { sm: '45vw', md: '35vw', lg: '25vw' } }}>
      <CrossIcon
        onClick={() => toggleDrawer(false)}
        sx={{
          position: 'absolute',
          right: '1rem',
          top: '1rem',
          fontSize: 30,
          display: 'flex',
          cursor: 'pointer',
          color: 'primary.main',
          zIndex: '1',
        }}
      />
      <Title component={'h2'} sx={{ p: 2 }} variant="section">
        Categories
      </Title>
      <List sx={{ p: 2 }}>
        {data ? (
          <>
            <CategoryItem
              name={'all'}
              slug={'all'}
              toggleDrawer={toggleDrawer}
            />
            {CategoryResponseFormatter(data).map(category => (
              <CategoryItem
                key={category.id}
                name={category.name}
                slug={category.slug}
                toggleDrawer={toggleDrawer}
              />
            ))}
          </>
        ) : (
          <>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                height={48}
                key={index}
                sx={{ mb: 1, borderRadius: 1 }}
                variant="rounded"
                width="100%"
              />
            ))}
          </>
        )}
      </List>
    </Box>
  );
};
export default CategoryList;
