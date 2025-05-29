import { ListItem } from '@mui/material';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router';

interface Props {
  slug: string;
  name: string;
  toggleDrawer: (value: boolean) => void;
}

const CategoryItem = ({ slug, name, toggleDrawer }: Props) => {
  return (
    <ListItem sx={{ cursor: 'pointer' }}>
      <Link
        component={NavLink}
        onClick={() => toggleDrawer(false)}
        sx={{
          maxWidth: '100%',
          width: '100%',
        }}
        to={slug}
        variant="categoryLink"
      >
        {name}
      </Link>
    </ListItem>
  );
};
export default CategoryItem;
