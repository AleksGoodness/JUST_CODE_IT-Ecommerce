import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router';

interface Props {
  slug: string;
  name: string;
  // description?: string;
}

const CategoryItem = ({ slug, name }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
        // boxShadow: '1',
        p: '0 0.2rem',
        gap: '0.2rem',
      }}
    >
      <Link
        component={NavLink}
        // key={category.id}
        sx={{
          maxWidth: '100%',
          width: '100%',
        }}
        to={slug}
        variant="categoryLink"
      >
        {name}
      </Link>
    </Box>
  );
};
export default CategoryItem;
